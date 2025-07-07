import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import Card from "../components/Card";
import { Colors, Spacing, FontSizes, BorderRadius } from "../constants/theme";

const AffirmationsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Growth");
  const [favorites, setFavorites] = useState(new Set());

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

  const filteredAffirmations = affirmations.filter(
    (affirmation) => affirmation.category === selectedCategory
  );

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
    <View style={styles.header}>
      <View style={styles.spacer} />
      <Text style={styles.headerTitle}>Affirmations</Text>
      <TouchableOpacity style={styles.favoritesButton}>
        <Text style={styles.heartIcon}>❤️</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDailyAffirmation = () => (
    <View style={styles.dailySection}>
      <TouchableOpacity style={styles.dailyCard}>
        <ImageBackground
          source={{ uri: dailyAffirmation.image }}
          style={styles.dailyCardBackground}
          imageStyle={styles.dailyCardImage}
        >
          <View style={styles.dailyCardOverlay}>
            <Text style={styles.dailyCardText}>"{dailyAffirmation.text}"</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favoriteActionButton}
        onPress={() => toggleFavorite(dailyAffirmation.id)}
      >
        <Text style={styles.favoriteActionIcon}>❤️</Text>
        <Text style={styles.favoriteActionText}>Save to Favorites</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategoryFilter = () => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>Filter by Category</Text>
      <View style={styles.categoryButtons}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category &&
                  styles.selectedCategoryButtonText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAffirmation = ({ item }) => (
    <TouchableOpacity style={styles.affirmationCard}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.affirmationCardBackground}
        imageStyle={styles.affirmationCardImage}
      >
        <View style={styles.affirmationCardOverlay}>
          <Text style={styles.affirmationCardText}>"{item.text}"</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {renderDailyAffirmation()}
        {renderCategoryFilter()}

        <View style={styles.affirmationsGrid}>
          {filteredAffirmations.map((affirmation) => (
            <View key={affirmation.id} style={styles.affirmationItem}>
              {renderAffirmation({ item: affirmation })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  spacer: {
    width: 48,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: "#1F2937",
    flex: 1,
    textAlign: "center",
  },
  favoritesButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  heartIcon: {
    fontSize: 24,
    color: "#6B7280",
  },
  scrollView: {
    flex: 1,
  },
  dailySection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    alignItems: "center",
  },
  dailyCard: {
    width: "100%",
    height: 256,
    marginBottom: Spacing.md,
  },
  dailyCardBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  dailyCardImage: {
    borderRadius: BorderRadius.lg,
  },
  dailyCardOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  dailyCardText: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "left",
    lineHeight: 32,
  },
  favoriteActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  favoriteActionIcon: {
    fontSize: 20,
    color: "#EF4444",
    marginRight: Spacing.sm,
  },
  favoriteActionText: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: "#1F2937",
  },
  filterSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginHorizontal: -Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
  filterTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: Spacing.md,
  },
  categoryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  selectedCategoryButton: {
    backgroundColor: "#DBEAFE",
  },
  categoryButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: "500",
    color: "#6B7280",
  },
  selectedCategoryButtonText: {
    color: "#1D4ED8",
  },
  affirmationsGrid: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  affirmationItem: {
    marginBottom: Spacing.lg,
  },
  affirmationCard: {
    height: 224,
  },
  affirmationCardBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  affirmationCardImage: {
    borderRadius: BorderRadius.lg,
  },
  affirmationCardOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  affirmationCardText: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "left",
    lineHeight: 28,
  },
});

export default AffirmationsScreen;
