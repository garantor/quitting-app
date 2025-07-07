import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { Colors, Spacing, FontSizes, BorderRadius } from "../constants/theme";

const CoachScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "What are you feeling right now?",
      isBot: true,
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "Let's breathe for a second together.",
      isBot: true,
      timestamp: new Date(),
    },
    {
      id: "3",
      text: "You've been here before and made it through.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const quickReplies = [
    "I'm feeling overwhelmed",
    "Remind me of my goals",
    "I need distraction",
  ];

  const botResponses = {
    struggling: [
      "I understand you're going through a difficult time. Remember, urges are temporary but your commitment to recovery is permanent.",
      "It's completely normal to struggle. Every person in recovery faces challenges. What matters is how you respond to them.",
      "Take a deep breath. You've overcome urges before, and you can do it again. What usually helps you feel better?",
    ],
    motivation: [
      "You've already taken the hardest step by deciding to change. Every day you choose recovery, you're building a stronger version of yourself.",
      "Remember why you started this journey. Your future self is counting on the choices you make today.",
      "Recovery isn't just about what you're giving up - it's about what you're gaining: clarity, self-respect, and genuine happiness.",
    ],
    affirmation: [
      "I am stronger than my urges.",
      "Every day I choose recovery, I grow stronger.",
      "I am worthy of a life free from addiction.",
      "Progress, not perfection.",
      "I choose clarity over temporary pleasure.",
    ],
    strong: [
      "That's wonderful to hear! Feeling strong is a sign that your recovery efforts are working.",
      "I'm so proud of your progress. Use this strength to help others who might be struggling.",
      "Great! Remember to celebrate these victories, both big and small.",
    ],
    default: [
      "Thank you for sharing that with me. Recovery is a journey with ups and downs, and I'm here to support you.",
      "I hear you. What would be most helpful for you right now?",
      "Every step forward, no matter how small, is progress. Keep going!",
    ],
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("struggling") ||
      message.includes("urge") ||
      message.includes("difficult")
    ) {
      return botResponses.struggling[
        Math.floor(Math.random() * botResponses.struggling.length)
      ];
    } else if (message.includes("motivation") || message.includes("inspire")) {
      return botResponses.motivation[
        Math.floor(Math.random() * botResponses.motivation.length)
      ];
    } else if (
      message.includes("affirmation") ||
      message.includes("positive")
    ) {
      return botResponses.affirmation[
        Math.floor(Math.random() * botResponses.affirmation.length)
      ];
    } else if (
      message.includes("strong") ||
      message.includes("good") ||
      message.includes("great")
    ) {
      return botResponses.strong[
        Math.floor(Math.random() * botResponses.strong.length)
      ];
    } else {
      return botResponses.default[
        Math.floor(Math.random() * botResponses.default.length)
      ];
    }
  };

  const sendMessage = (text = inputText) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const renderMessage = ({ item, index }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.isBot ? styles.botMessage : styles.userMessage,
        ]}
      >
        {item.isBot && (
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeFwxJx7RAHP_4Se2N1QA45r4nX6oDZpCdazttDWZZaPkkDuZPHwHEch70abm1oQ9j2QeueLxafvEgRXp0VbCwY1aJctrrey03jo3mS5e3J02-Cej2Kr3TwEN0ZCUC06n4mO7xgmCRVPjx9T4LsMk4jvcxWTEtVn6hvwW3pP3UDjPlm-yHVFZSXeXkfUFxNTnWvYVltPIx41dlPs_j06T43m9e4aJxJghXh2Cu7UNspQ2am93SIkcqZewCm93UqmPqGn7VjdUXwck",
              }}
              style={styles.avatar}
            />
          </View>
        )}
        <View style={styles.messageContent}>
          {item.isBot && <Text style={styles.senderLabel}>Clarity Coach</Text>}
          <View
            style={[
              styles.messageBubble,
              item.isBot ? styles.botBubble : styles.userBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.isBot ? styles.botText : styles.userText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderQuickReply = (reply, index) => {
    return (
      <TouchableOpacity
        key={reply}
        style={styles.quickReplyButton}
        onPress={() => sendMessage(reply)}
      >
        <Text style={styles.quickReplyText}>{reply}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <LinearGradient
        colors={["#DBEAFE", "transparent"]}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Clarity Coach</Text>
            <View style={styles.headerSpacer} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main Content */}
      <LinearGradient
        colors={["#DBEAFE", "#F0FDFA"]}
        style={styles.mainContent}
      >
        <ScrollView
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((item, index) => renderMessage({ item, index }))}

          {/* Quick Replies */}
          <View style={styles.quickRepliesSection}>
            {quickReplies.map(renderQuickReply)}
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Fixed Bottom Input */}
      <LinearGradient
        colors={["rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)"]}
        style={styles.inputGradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type a message"
                placeholderTextColor="#64748B"
                multiline={false}
                maxLength={500}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => sendMessage()}
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: Platform.OS === "ios" ? 0 : 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    color: "#1E293B",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
  headerSpacer: {
    width: 40,
  },
  mainContent: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 100 : 140,
    paddingBottom: 120,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  messageContainer: {
    marginBottom: Spacing.lg,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  botMessage: {
    alignSelf: "flex-start",
  },
  userMessage: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  avatarContainer: {
    marginRight: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  messageContent: {
    flex: 1,
    maxWidth: "80%",
  },
  senderLabel: {
    fontSize: FontSizes.xs,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  messageBubble: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    maxWidth: 360,
  },
  botBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: Spacing.xs,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: Spacing.xs,
  },
  messageText: {
    fontSize: FontSizes.md,
    lineHeight: 24,
    fontWeight: "400",
  },
  botText: {
    color: "#1E293B",
  },
  userText: {
    color: "#FFFFFF",
  },
  quickRepliesSection: {
    alignItems: "center",
    paddingTop: Spacing.xl,
    gap: Spacing.sm,
  },
  quickReplyButton: {
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 24,
    minWidth: 84,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  quickReplyText: {
    color: "#1E293B",
    fontSize: FontSizes.md,
    fontWeight: "500",
    textAlign: "center",
  },
  inputGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(226,232,240,0.8)",
  },
  inputContainer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Platform.OS === "ios" ? Spacing.xl : Spacing.md,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  textInput: {
    flex: 1,
    height: 48,
    backgroundColor: "#F1F5F9",
    borderRadius: 24,
    paddingHorizontal: Spacing.lg,
    fontSize: FontSizes.md,
    color: "#1E293B",
    borderWidth: 0,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CoachScreen;
