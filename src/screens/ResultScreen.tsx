import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';
import BasicButton from '../components/BasicButton';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import ResultsDisplay from '../components/ResultDisplay';

export type ResultScreenProps = StackScreenProps<RootNavigationType, 'Result'>;

function ResultsScreen({route}: ResultScreenProps) {
  const {correctCount, totalQuestions, elapsedTime} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Progress.Pie
        progress={correctCount / totalQuestions}
        indeterminate={false}
        size={240}
        color={colors.main}
        style={{marginVertical: spacing.xxl}}
      />
      <ResultsDisplay
        totalQuestions={totalQuestions}
        correctCount={correctCount}
        elapsedTime={elapsedTime}
      />
      <View style={styles.buttonContainer}>
        <BasicButton title={'메인 화면으로 돌아가기'} onPress={() => {}} />
        <BasicButton title={'결과 저장하기'} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  resultContainer: {
    flexDirection: 'column',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: spacing.small,
  },
});

export default ResultsScreen;
