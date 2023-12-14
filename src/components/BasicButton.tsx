import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {colors, fontSize, radius, spacing} from '../constants/\btheme';

interface BasicButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

function BasicButton({title, onPress}: BasicButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.main,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: radius.medium,
    alignItems: 'center',
    marginVertical: spacing.small,
    fontSize: fontSize.medium,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.large,
  },
});

export default BasicButton;
