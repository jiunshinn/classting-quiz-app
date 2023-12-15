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
import {formatDateString} from '../utils/formatTime';
import BasicButton from '../components/BasicButton';
import {decodeHTMLEntities} from '../utils/decodeHtml';

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

function WrongNoteScreen({navigation}: WrongNoteScreenProps) {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    getQuizResults();
  }, []);

  const getQuizResults = async () => {
    const results = await AsyncStorage.getItem('wrongQuizResults');
    if (results) {
      setQuizResults(JSON.parse(results));
    }
  };

  if (quizResults.length === 0) {
    return (
      <SafeAreaView style={styles.noQuizContainer}>
        <Text style={styles.noQuizTitle}>퀴즈 결과가 없습니다.</Text>
        <Text style={styles.noQuizSubTitle}>
          문제를 먼저 풀고 확인해주세요!
        </Text>
        <BasicButton title={'확인'} onPress={navigation.goBack} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {selectedDate === null ? (
          quizResults.map((result, index) => (
            <View style={styles.card} key={index}>
              <TouchableOpacity onPress={() => setSelectedDate(result.date)}>
                <Text style={styles.dateText}>
                  {formatDateString(result.date)}에 푼 퀴즈 오답노트 확인
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View>
            {quizResults
              .find(result => result.date === selectedDate)
              ?.wrongAnswers.map((answer, ansIndex) => (
                <View key={ansIndex} style={styles.card}>
                  <Text style={styles.question}>
                    {decodeHTMLEntities(answer.question)}
                  </Text>
                  <Text style={styles.userAnswer}>
                    내가 고른 정답 : {answer.userAnswer}
                  </Text>
                  <Text style={styles.correctAnswer}>
                    실제 정답 : {answer.correct_answer}
                  </Text>
                </View>
              ))}
            <BasicButton title={'확인'} onPress={() => setSelectedDate(null)} />
          </View>
        )}
      </ScrollView>
      {!selectedDate && (
        <BasicButton
          title={'목록으로 돌아가기'}
          onPress={() => navigation.goBack()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
  },
  dateText: {
    fontSize: fontSize.medium,
    color: colors.black,
  },
  backText: {
    fontSize: fontSize.medium,
    color: colors.black,
    marginBottom: spacing.medium,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
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
  question: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
  },
  userAnswer: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.error,
  },
  correctAnswer: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.main,
  },
});

export default WrongNoteScreen;
