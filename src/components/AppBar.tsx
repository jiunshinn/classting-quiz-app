import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import fontSize from '../constants/fontSize';
import radius from '../constants/radius';

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
  const formatTime = (seconds: number): string => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    const hours = pad(Math.floor(seconds / 3600));
    const minutes = pad(Math.floor((seconds % 3600) / 60));
    const secs = pad(seconds % 60);
    return `${hours}:${minutes}:${secs}`;
  };
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
