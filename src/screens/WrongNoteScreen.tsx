import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fontSize, spacing} from '../constants/\btheme';

export type WrongNoteScreenProps = StackScreenProps<
  RootNavigationType,
  'WrongNote'
>;

type WrongAnswer = {
  question: string;
  userAnswer: string;
  correct_answer: string;
};

type QuizResult = {
  date: string;
  wrongAnswers: WrongAnswer[];
};

function WrongNoteScreen() {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const getQuizResults = async () => {
      const results = await AsyncStorage.getItem('wrongQuizResults');
      if (results) {
        setQuizResults(JSON.parse(results));
      }
    };

    getQuizResults();
  }, []);

  if (quizResults) {
    return (
      <SafeAreaView style={styles.noQuizContainer}>
        <Text style={styles.noQuizTitle}>퀴즈 결과가 없습니다.</Text>
        <Text style={styles.noQuizSubTitle}>
          문제를 먼저 풀고 확인해주세요!
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {selectedDate === null ? (
          quizResults.map((result, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDate(result.date)}>
              <Text style={styles.dateText}>Date: {result.date}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View>
            <TouchableOpacity onPress={() => setSelectedDate(null)}>
              <Text style={styles.backText}>Back to Dates</Text>
            </TouchableOpacity>
            {quizResults
              .find(result => result.date === selectedDate)
              ?.wrongAnswers.map((answer, ansIndex) => (
                <View key={ansIndex} style={styles.answerContainer}>
                  <Text>Question: {answer.question}</Text>
                  <Text>Your Answer: {answer.userAnswer}</Text>
                  <Text>Correct Answer: {answer.correct_answer}</Text>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateText: {},
  backText: {},
  answerContainer: {},
  noQuizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noQuizTitle: {
    fontSize: fontSize.xxl,
    color: colors.main,
  },
  noQuizSubTitle: {
    fontSize: fontSize.large,
    color: colors.black,
    marginTop: spacing.medium,
  },
});

export default WrongNoteScreen;
