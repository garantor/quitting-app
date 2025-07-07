import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Colors } from "../constants/theme";

const ProgressRing = ({ progress = 0, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.progressRing, { width: size, height: size }]}>
        {/* Background circle */}
        <View
          style={[
            styles.circle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: Colors.light.border,
            },
          ]}
        />
        {/* Progress circle */}
        <View
          style={[
            styles.progressCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: Colors.primary,
              borderTopColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "transparent",
              transform: [{ rotate: `${progress * 360}deg` }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressRing: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  progressCircle: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default ProgressRing;
