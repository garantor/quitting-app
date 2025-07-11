import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Animated,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';
import { colors, spacing, fontSizes, borderRadius } from '../constants/theme';

export default function CoachScreen({ navigation }) {
  const { isDarkMode } = useContext(UserContext);
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const scrollViewRef = useRef();
  
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
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    goals: [
      "Your goals are: staying healthy, rebuilding relationships, and finding genuine happiness. Each day clean is a step closer to these goals.",
      "Remember, you wanted to wake up feeling proud of yourself. You wanted to be present for the people you love. Keep going!",
      "You started this journey to reclaim your life. Every urge you resist is you choosing your future over temporary pleasure.",
    ],
    distraction: [
      "Here are some healthy distractions: take a walk, call a friend, practice deep breathing, listen to music, or try the 5-4-3-2-1 grounding technique.",
      "Physical activity can help! Try doing 10 push-ups, going for a quick walk, or dancing to your favorite song.",
      "Engage your mind: read a chapter of a book, do a puzzle, watch a funny video, or practice a hobby you enjoy.",
    ],
    overwhelmed: [
      "Feeling overwhelmed is normal. Let's break it down into smaller pieces. What's the most pressing thing on your mind right now?",
      "When everything feels like too much, focus on just the next hour. What's one small thing you can do right now to take care of yourself?",
      "Remember: you don't have to solve everything today. Just focus on staying clean today. That's enough.",
    ],
    default: [
      "Thank you for sharing that with me. Recovery is a journey with ups and downs, and I'm here to support you.",
      "I hear you. What would be most helpful for you right now?",
      "Every step forward, no matter how small, is progress. Keep going!",
    ],
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("overwhelmed") || message.includes("too much")) {
      return botResponses.overwhelmed[
        Math.floor(Math.random() * botResponses.overwhelmed.length)
      ];
    } else if (message.includes("goals") || message.includes("remind")) {
      return botResponses.goals[
        Math.floor(Math.random() * botResponses.goals.length)
      ];
    } else if (message.includes("distraction") || message.includes("distract")) {
      return botResponses.distraction[
        Math.floor(Math.random() * botResponses.distraction.length)
      ];
    } else if (
      message.includes("struggling") ||
      message.includes("urge") ||
      message.includes("difficult") ||
      message.includes("hard")
    ) {
      return botResponses.struggling[
        Math.floor(Math.random() * botResponses.struggling.length)
      ];
    } else if (message.includes("motivation") || message.includes("inspire")) {
      return botResponses.motivation[
        Math.floor(Math.random() * botResponses.motivation.length)
      ];
    } else {
      return botResponses.default[
        Math.floor(Math.random() * botResponses.default.length)
      ];
    }
  };

  const sendMessage = (text = inputText) => {
    if (!text.trim()) return;

    // Hide quick replies after first message
    setShowQuickReplies(false);

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      
      // Scroll to bottom after bot response
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const renderMessage = (message, index) => {
    return (
      <Animated.View
        key={message.id}
        style={[
          styles.messageWrapper,
          message.isBot ? styles.botMessageWrapper : styles.userMessageWrapper,
          {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })
            }]
          }
        ]}
      >
        {message.isBot && (
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Ionicons name="chatbubble" size={20} color="#FFFFFF" />
            </View>
            <View style={[styles.avatarRing, { borderColor: currentColors.surface }]} />
          </View>
        )}
        
        <View style={styles.messageContent}>
          {message.isBot && (
            <Text style={[styles.senderName, { color: currentColors.textSecondary }]}>
              Clarity Coach
            </Text>
          )}
          
          <View style={[
            styles.messageBubble,
            message.isBot ? [
              styles.botBubble, 
              { backgroundColor: currentColors.surface }
            ] : [
              styles.userBubble, 
              { backgroundColor: colors.primary }
            ]
          ]}>
            <Text style={[
              styles.messageText,
              { 
                color: message.isBot ? currentColors.text : '#FFFFFF'
              }
            ]}>
              {message.text}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderQuickReplies = () => {
    if (!showQuickReplies) return null;

    return (
      <Animated.View 
        style={[
          styles.quickRepliesContainer,
          {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })
            }]
          }
        ]}
      >
        {quickReplies.map((reply, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.quickReplyButton,
              { 
                backgroundColor: currentColors.surface,
                borderWidth: 1,
                borderColor: currentColors.border
              }
            ]}
            onPress={() => sendMessage(reply)}
            activeOpacity={0.8}
          >
            <Text style={[styles.quickReplyText, { color: currentColors.text }]}>
              {reply}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    );
  };

  // Using Clarity app color palette correctly
  const gradientColors = isDarkMode 
    ? ['#111827', '#374151'] // Dark background to dark surface
    : ['#dbeafe', '#ccfbf1']; // Light blue to light teal

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={[styles.headerContainer, { backgroundColor: currentColors.surface, borderBottomColor: currentColors.border }]}>
          <View style={styles.header}>
            {/* <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: currentColors.background }]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={20} color={currentColors.text} />
            </TouchableOpacity> */}
            
            <Text style={[styles.headerTitle, { color: currentColors.text }]}>
              Clarity Coach
            </Text>
            
            <View style={styles.headerSpacer} />
          </View>
        </View>

        {/* Messages */}
        <LinearGradient
          colors={gradientColors}
          style={styles.messagesGradient}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message, index) => renderMessage(message, index))}
            {renderQuickReplies()}
          </ScrollView>
        </LinearGradient>

        {/* Input */}
        <View style={[styles.inputContainer, { backgroundColor: currentColors.surface, borderTopColor: currentColors.border }]}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.textInput,
                { 
                  backgroundColor: currentColors.background,
                  color: currentColors.text,
                  borderColor: currentColors.border
                }
              ]}
              placeholder="Type a message"
              placeholderTextColor={currentColors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            
            <TouchableOpacity 
              style={[
                styles.sendButton, 
                { 
                  backgroundColor: inputText.trim() ? colors.primary : currentColors.border
                }
              ]}
              onPress={() => sendMessage()}
              disabled={!inputText.trim()}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={inputText.trim() ? '#FFFFFF' : currentColors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
     minHeight: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  headerSpacer: {
    width: 40,
  },
  messagesGradient: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  botMessageWrapper: {
    alignItems: 'flex-end',
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    borderWidth: 4,
  },
  messageContent: {
    flex: 1,
    maxWidth: '80%',
  },
  senderName: {
    fontSize: fontSizes.xs,
    fontWeight: '500',
    marginBottom: spacing.xs / 2,
  },
  messageBubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  botBubble: {
    borderBottomLeftRadius: spacing.xs,
  },
  userBubble: {
    borderBottomRightRadius: spacing.xs,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: fontSizes.md,
    lineHeight: 22,
  },
  quickRepliesContainer: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  quickReplyButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xxl,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickReplyText: {
    fontSize: fontSizes.md,
    fontWeight: '500',
  },
  inputContainer: {
    borderTopWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  textInput: {
    flex: 1,
    borderRadius: borderRadius.xxl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    fontSize: fontSizes.md,
    maxHeight: 100,
    minHeight: 48,
    borderWidth: 1,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});