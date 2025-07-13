import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, borderRadius, fontSizes } from '../constants/theme';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  style,
  ...props 
}) {
  // Debug log to see if Button is being rendered
  console.log('Button rendering:', { title, variant, disabled });
  
  return (
       <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={disabled ? null : onPress}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`], disabled && styles.disabledText]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  md: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: fontSizes.md,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontSize: fontSizes.md,
  },
  outlineText: {
    color: colors.primary,
    fontSize: fontSizes.md,
  },
    disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});