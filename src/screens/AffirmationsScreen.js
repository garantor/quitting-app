import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';
import Card from "../components/Card";
import { colors, spacing, fontSizes, borderRadius } from "../constants/theme";

export default function AffirmationsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Growth");
  const [favorites, setFavorites] = useState(new Set());
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const { isDarkMode } = useContext(UserContext);
  const currentColors = isDarkMode ? colors.dark : colors.light;

  const categories = ["Growth", "Mindfulness", "Spiritual", "Confidence"];

  // Featured daily affirmation
  const dailyAffirmation = {
    id: "daily",
    text: "I am worthy of love and respect.",
    category: "Confidence",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  };

  const affirmations = [
    {
      id: "1",
      text: "I am in control of my actions and choices.",
      category: "Confidence",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    },
    {
      id: "2",
      text: "Every day I choose recovery, I grow stronger.",
      category: "Growth",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "3",
      text: "I am capable of overcoming any challenge.",
      category: "Growth",
      image:
        "https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "4",
      text: "I am grateful for the progress I have made.",
      category: "Growth",
      image:
        "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "5",
      text: "I choose clarity over temporary pleasure.",
      category: "Mindfulness",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "6",
      text: "My mind is clear, my spirit is strong.",
      category: "Spiritual",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    },
    {
      id: "7",
      text: "I have the power to change my life.",
      category: "Confidence",
      image:
        "https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "8",
      text: "Each moment of resistance builds my character.",
      category: "Growth",
      image:
        "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "9",
      text: "I am present in this moment and at peace.",
      category: "Mindfulness",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "10",
      text: "Divine strength flows through me.",
      category: "Spiritual",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    },
  ];

  // Initialize with daily affirmation
  React.useEffect(() => {
    setCurrentAffirmation(dailyAffirmation.text);
  }, []);

  const filteredAffirmations = affirmations.filter(
    (affirmation) => affirmation.category === selectedCategory
  );

  const getRandomAffirmation = () => {
    const allAffirmations = [dailyAffirmation, ...affirmations];
    const randomIndex = Math.floor(Math.random() * allAffirmations.length);
    setCurrentAffirmation(allAffirmations[randomIndex].text);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const renderHeader = () => (
    <View style={[styles.header, { borderBottomColor: currentColors.border }]}>
      <View style={styles.spacer} />
      <Text style={[styles.headerTitle, { color: currentColors.text }]}>
        Affirmations
      </Text>
      <TouchableOpacity style={styles.favoritesButton}>
        <Ionicons name="heart" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  const renderDailyAffirmation = () => (
    <View style={styles.dailySection}>
      <Text style={[styles.sectionTitle, { color: currentColors.text }]}>
        Daily Affirmation
      </Text>
      <TouchableOpacity style={styles.dailyCard}>
        <ImageBackground
          source={{ uri: dailyAffirmation.image }}
          style={styles.dailyCardBackground}
          imageStyle={styles.dailyCardImage}
        >
          <View style={styles.dailyCardOverlay}>
            <Text style={styles.dailyCardText}>"{currentAffirmation}"</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.favoriteActionButton, { backgroundColor: colors.primary }]}
        onPress={getRandomAffirmation}
      >
        <Ionicons name="refresh" size={20} color="#FFFFFF" />
        <Text style={styles.favoriteActionText}>New Affirmation</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategoryFilter = () => (
    <View style={styles.filterSection}>
      <Text style={[styles.filterTitle, { color: currentColors.text }]}>
        Browse by Category
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryButtons}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              { 
                backgroundColor: currentColors.surface,
                borderColor: currentColors.border 
              },
              selectedCategory === category && { 
                backgroundColor: colors.primary,
                borderColor: colors.primary 
              },
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                { color: currentColors.text },
                selectedCategory === category && { color: "#FFFFFF" },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderAffirmation = ({ item }) => (
    <TouchableOpacity 
      style={styles.affirmationCard}
      onPress={() => setCurrentAffirmation(item.text)}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.affirmationCardBackground}
        imageStyle={styles.affirmationCardImage}
      >
        <View style={styles.affirmationCardOverlay}>
          <Text style={styles.affirmationCardText}>"{item.text}"</Text>
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={() => toggleFavorite(item.id)}
          >
            <Ionicons 
              name={favorites.has(item.id) ? "heart" : "heart-outline"} 
              size={24} 
              color={favorites.has(item.id) ? colors.error : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      {renderHeader()}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderDailyAffirmation()}
        {renderCategoryFilter()}
        
        <View style={styles.affirmationsGrid}>
          <FlatList
            data={filteredAffirmations}
            renderItem={renderAffirmation}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  borderBottomWidth: 1,
  minHeight: 60, // Changed from 80 to 60
},
  spacer: {
    width: 24,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
  },
  favoritesButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  dailySection: {
    marginBottom: spacing.xl,
  },
  dailyCard: {
    height: 200,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  dailyCardBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dailyCardImage: {
    borderRadius: borderRadius.lg,
  },
  dailyCardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    margin: spacing.md,
  },
  dailyCardText: {
    color: '#FFFFFF',
    fontSize: fontSizes.lg,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
  },
  favoriteActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  favoriteActionText: {
    color: '#FFFFFF',
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: spacing.lg,
  },
  filterTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  categoryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  categoryButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
  },
  affirmationsGrid: {
    marginBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
  affirmationCard: {
    flex: 1,
    height: 150,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginHorizontal: spacing.xs,
  },
  affirmationCardBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  affirmationCardImage: {
    borderRadius: borderRadius.md,
  },
  affirmationCardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: spacing.md,
    position: 'relative',
  },
  affirmationCardText: {
    color: '#FFFFFF',
    fontSize: fontSizes.sm,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  favoriteIcon: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: spacing.xs,
  },
});