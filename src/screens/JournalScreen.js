import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';
import { colors, spacing, fontSizes, borderRadius } from '../constants/theme';
import Card from '../components/Card';
import Button from '../components/Button';

export default function JournalScreen({ navigation }) {
  const { isDarkMode, journalEntries, addJournalEntry } = useContext(UserContext);
  const currentColors = isDarkMode ? colors.dark : colors.light;
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
      id: Date.now().toString(),
      mood: selectedMood,
      note: noteText.trim(),
      tags: selectedTags,
      date: new Date().toISOString(),
    };

    addJournalEntry(entry);

    // Reset form
    setSelectedMood("");
    setNoteText("");
    setSelectedTags([]);
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: currentColors.surface, borderBottomColor: currentColors.border }]}>
      <View style={styles.headerContent}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: currentColors.background }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color={currentColors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerTextContainer}>
          <Text style={[styles.headerTitle, { color: currentColors.text }]}>
            Recovery Journal
          </Text>
          <Text style={[styles.headerSubtitle, { color: currentColors.textSecondary }]}>
            Track your emotions and thoughts
          </Text>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>
    </View>
  );

  const renderMoodSelector = () => (
    <Card style={{ backgroundColor: currentColors.surface }}>
      <Text style={[styles.sectionTitle, { color: currentColors.text }]}>
        How are you feeling?
      </Text>
      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[
              styles.moodButton,
              { borderColor: currentColors.border },
              selectedMood === mood.value && {
                borderColor: colors.primary,
                backgroundColor: colors.primary + "10",
              },
            ]}
            onPress={() => handleMoodSelect(mood.value)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={[styles.moodLabel, { color: currentColors.text }]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  const renderNoteInput = () => (
    <Card style={{ backgroundColor: currentColors.surface }}>
      <Text style={[styles.sectionTitle, { color: currentColors.text }]}>
        Write your thoughts (optional)
      </Text>
      <TextInput
        style={[
          styles.noteInput,
          {
            borderColor: currentColors.border,
            color: currentColors.text,
            backgroundColor: currentColors.background,
          },
        ]}
        placeholder="How are you feeling today? What's on your mind?"
        placeholderTextColor={currentColors.textSecondary}
        value={noteText}
        onChangeText={setNoteText}
        multiline
        textAlignVertical="top"
      />
    </Card>
  );

  const renderTagSelector = () => (
    <Card style={{ backgroundColor: currentColors.surface }}>
      <Text style={[styles.sectionTitle, { color: currentColors.text }]}>
        Add tags (optional)
      </Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tagButton,
              { borderColor: currentColors.border },
              selectedTags.includes(tag) && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => handleTagToggle(tag)}
          >
            <Text
              style={[
                styles.tagText,
                { color: currentColors.text },
                selectedTags.includes(tag) && { color: "#FFFFFF" },
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  const renderJournalEntry = ({ item }) => {
    const date = new Date(item.date);
    const selectedMoodObj = moods.find((m) => m.value === item.mood);

    return (
      <Card style={[styles.entryCard, { backgroundColor: currentColors.surface }]}>
        <View style={styles.entryHeader}>
          <View style={styles.entryInfo}>
            <Text style={[styles.entryDate, { color: currentColors.textSecondary }]}>
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
                <Text style={[styles.entryMoodLabel, { color: currentColors.text }]}>
                  {selectedMoodObj.label}
                </Text>
              </View>
            )}
          </View>
        </View>

        {item.note && (
          <Text style={[styles.entryNote, { color: currentColors.text }]}>
            {item.note}
          </Text>
        )}

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
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      {renderHeader()}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderMoodSelector()}
        {renderNoteInput()}
        {renderTagSelector()}

        <Button
          title="Save Entry"
          onPress={handleSaveEntry}
          disabled={!selectedMood && !noteText.trim()}
          style={styles.saveButton}
        />
        

        <View style={styles.entriesHeader}>
          <Text style={[styles.entriesTitle, { color: currentColors.text }]}>
            Previous Entries
          </Text>
        </View>

        {journalEntries && journalEntries.length > 0 ? (
          <FlatList
            data={journalEntries}
            renderItem={renderJournalEntry}
            keyExtractor={(item) => item.id}
            style={styles.entriesList}
            scrollEnabled={false}
          />
        ) : (
          <Text style={[styles.noEntriesText, { color: currentColors.textSecondary }]}>
            No journal entries yet. Start by adding your first entry above!
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   header: {
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
    minHeight: 60,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
    textAlign: "center",
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  moodButton: {
    alignItems: "center",
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    width: "30%",
    minWidth: 80,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  moodLabel: {
    fontSize: fontSizes.sm,
    textAlign: "center",
  },
  noteInput: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSizes.md,
    minHeight: 100,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tagButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  tagText: {
    fontSize: fontSizes.sm,
  },
  saveButton: {
    marginVertical: spacing.lg,
  },
  entriesHeader: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  entriesTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
  },
  entriesList: {
    marginBottom: spacing.xl,
  },
  entryCard: {
    marginBottom: spacing.sm,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  entryInfo: {
    flex: 1,
  },
  entryDate: {
    fontSize: fontSizes.sm,
  },
  entryMood: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  entryMoodEmoji: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  entryMoodLabel: {
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  entryNote: {
    fontSize: fontSizes.md,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  entryTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  entryTag: {
    backgroundColor: colors.primary + "20",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  entryTagText: {
    fontSize: fontSizes.xs,
    color: colors.primary,
    fontWeight: "500",
  },
  noEntriesText: {
    fontSize: fontSizes.md,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
});