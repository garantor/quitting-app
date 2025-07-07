import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useUser } from "../context/UserContext";
import Button from "../components/Button";
import Card from "../components/Card";
import { Colors, Spacing, FontSizes, BorderRadius } from "../constants/theme";

const JournalScreen = () => {
  const { journalEntries, addJournalEntry } = useUser();
  const [selectedMood, setSelectedMood] = useState("");
  const [noteText, setNoteText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "😔", label: "Sad", value: "sad" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
    { emoji: "😡", label: "Angry", value: "angry" },
    { emoji: "💪", label: "Strong", value: "strong" },
  ];

  const tags = [
    "Urge",
    "Trigger",
    "Victory",
    "Grateful",
    "Stressed",
    "Motivated",
    "Lonely",
    "Confident",
    "Tempted",
    "Peaceful",
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSaveEntry = () => {
    if (!selectedMood && !noteText.trim()) return;

    const entry = {
      mood: selectedMood,
      note: noteText.trim(),
      tags: selectedTags,
    };

    addJournalEntry(entry);

    // Reset form
    setSelectedMood("");
    setNoteText("");
    setSelectedTags([]);
  };

  const renderMoodSelector = () => {
    return (
      <Card>
        <Text style={styles.sectionTitle}>How are you feeling?</Text>
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.value}
              style={[
                styles.moodButton,
                selectedMood === mood.value && styles.selectedMood,
              ]}
              onPress={() => handleMoodSelect(mood.value)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
    );
  };

  const renderTagSelector = () => {
    return (
      <Card>
        <Text style={styles.sectionTitle}>Add tags (optional)</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                selectedTags.includes(tag) && styles.selectedTag,
              ]}
              onPress={() => handleTagToggle(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.selectedTagText,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
    );
  };

  const renderJournalEntry = ({ item }) => {
    const date = new Date(item.date);
    const selectedMoodObj = moods.find((m) => m.value === item.mood);

    return (
      <Card style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <View style={styles.entryInfo}>
            <Text style={styles.entryDate}>
              {date.toLocaleDateString()} at{" "}
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            {selectedMoodObj && (
              <View style={styles.entryMood}>
                <Text style={styles.entryMoodEmoji}>
                  {selectedMoodObj.emoji}
                </Text>
                <Text style={styles.entryMoodLabel}>
                  {selectedMoodObj.label}
                </Text>
              </View>
            )}
          </View>
        </View>

        {item.note && <Text style={styles.entryNote}>{item.note}</Text>}

        {item.tags && item.tags.length > 0 && (
          <View style={styles.entryTags}>
            {item.tags.map((tag, index) => (
              <View key={index} style={styles.entryTag}>
                <Text style={styles.entryTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Journal & Reflection</Text>
          <Text style={styles.headerSubtitle}>
            Record your thoughts and feelings
          </Text>
        </View>

        {renderMoodSelector()}

        <Card>
          <Text style={styles.sectionTitle}>Write a note</Text>
          <TextInput
            style={styles.noteInput}
            value={noteText}
            onChangeText={setNoteText}
            placeholder="How was your day? What are you grateful for? What challenges did you face?"
            placeholderTextColor={Colors.light.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </Card>

        {renderTagSelector()}

        <Button
          title="Save Entry"
          onPress={handleSaveEntry}
          style={styles.saveButton}
          disabled={!selectedMood && !noteText.trim()}
        />

        <View style={styles.entriesHeader}>
          <Text style={styles.entriesTitle}>Previous Entries</Text>
        </View>

        {journalEntries.length > 0 ? (
          <FlatList
            data={journalEntries}
            renderItem={renderJournalEntry}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.entriesList}
          />
        ) : (
          <Card>
            <Text style={styles.noEntriesText}>
              No journal entries yet. Start by writing your first entry above!
            </Text>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  header: {
    paddingVertical: Spacing.lg,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  moodButton: {
    alignItems: "center",
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.light.border,
    width: "30%",
    minWidth: 80,
  },
  selectedMood: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "10",
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  moodLabel: {
    fontSize: FontSizes.sm,
    color: Colors.light.text,
    textAlign: "center",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.light.text,
    minHeight: 100,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  tagButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedTag: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tagText: {
    fontSize: FontSizes.sm,
    color: Colors.light.text,
  },
  selectedTagText: {
    color: "#FFFFFF",
  },
  saveButton: {
    marginVertical: Spacing.lg,
  },
  entriesHeader: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  entriesTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
  },
  entriesList: {
    marginBottom: Spacing.xl,
  },
  entryCard: {
    marginBottom: Spacing.sm,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  entryInfo: {
    flex: 1,
  },
  entryDate: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  entryMood: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  entryMoodEmoji: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  entryMoodLabel: {
    fontSize: FontSizes.sm,
    color: Colors.light.text,
    fontWeight: "500",
  },
  entryNote: {
    fontSize: FontSizes.md,
    color: Colors.light.text,
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },
  entryTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.xs,
  },
  entryTag: {
    backgroundColor: Colors.primary + "20",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
  },
  entryTagText: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    fontWeight: "500",
  },
  noEntriesText: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default JournalScreen;
