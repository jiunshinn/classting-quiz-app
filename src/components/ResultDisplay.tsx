import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {formatTime} from '../utils/formatTime';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import spacing from '../constants/spacing';

interface ResultsDisplayProps {
  totalQuestions: number;
  correctCount: number;
  elapsedTime: number;
}

function ResultsDisplay({
  totalQuestions,
  correctCount,
  elapsedTime,
}: ResultsDisplayProps) {
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.text}>총 퀴즈 개수: {totalQuestions}</Text>
      <Text style={styles.text}>정답: {correctCount}</Text>
      <Text style={styles.text}>오답: {totalQuestions - correctCount}</Text>
      <Text style={styles.text}>소요시간: {formatTime(elapsedTime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    alignItems: 'flex-start',
  },
  text: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: '400',
  },
});

export default ResultsDisplay;
