import React from 'react';
import {Text, View} from 'react-native';

function ResultsScreen({route}) {
  const {correctCount, totalQuestions} = route.params;

  return (
    <View>
      <Text>
        {totalQuestions}문제 중 {correctCount} 문제 정답.
      </Text>
      <Text>{totalQuestions - correctCount}를 틀렸습니다.</Text>
    </View>
  );
}

export default ResultsScreen;
