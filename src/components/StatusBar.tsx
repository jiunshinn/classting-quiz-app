import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, fontSize, radius, spacing} from '../constants/\btheme';
import {formatTime} from '../utils/formatTime';

interface StatusBarProps {
  elapsedTime: number;
  currentQuestionIndex: number;
  totalQuestions: number;
}

function StatusBar({
  elapsedTime,
  currentQuestionIndex,
  totalQuestions,
}: StatusBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>소요시간: {formatTime(elapsedTime)}</Text>
      <Text style={styles.text}>
        총 {totalQuestions}문제 중 {currentQuestionIndex + 1}번 문제
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    padding: spacing.medium,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: radius.medium,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.large,
  },
});

export default StatusBar;
