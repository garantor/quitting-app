import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSizes } from '../constants/theme';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  ...props 
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
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
});