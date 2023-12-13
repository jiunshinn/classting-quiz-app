import React from 'react';
import {Text, View} from 'react-native';
import {formatTime} from '../utils/formatTime';

function ResultsScreen({route}) {
  const {correctCount, totalQuestions, elapsedTime} = route.params;

  return (
    <View>
      <Text>
        {totalQuestions}문제 중 {correctCount} 문제 정답.
      </Text>
      <Text>{totalQuestions - correctCount}문제를 틀렸습니다.</Text>
      <Text>소요시간: {formatTime(elapsedTime)}</Text>
    </View>
  );
}

export default ResultsScreen;
