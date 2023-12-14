import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, fontSize, radius, spacing} from '../constants/\btheme';
import {formatTime} from '../utils/formatTime';
import * as Progress from 'react-native-progress';

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
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={(currentQuestionIndex + 1) / totalQuestions}
          width={200}
          color={colors.main}
          borderWidth={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: radius.medium,
  },
  text: {
    color: colors.main,
    fontSize: fontSize.large,
    marginBottom: spacing.small,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default StatusBar;
