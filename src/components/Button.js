import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, BorderRadius, Spacing, FontSizes } from "../constants/theme";

const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    if (disabled) {
      baseStyle.push(styles.disabled);
    } else {
      baseStyle.push(styles[variant]);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle = [
      styles.text,
      styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}`],
    ];

    if (variant === "outline") {
      baseTextStyle.push(styles.outlineText);
    } else {
      baseTextStyle.push(styles.primaryText);
    }

    if (textStyle) {
      baseTextStyle.push(textStyle);
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: "transparent",
  },

  // Sizes
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },

  // States
  disabled: {
    backgroundColor: "#9CA3AF",
    opacity: 0.6,
  },

  // Text styles
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  textSmall: {
    fontSize: FontSizes.sm,
  },
  textMedium: {
    fontSize: FontSizes.md,
  },
  textLarge: {
    fontSize: FontSizes.lg,
  },
  primaryText: {
    color: "#FFFFFF",
  },
  outlineText: {
    color: Colors.primary,
  },
});

export default Button;
