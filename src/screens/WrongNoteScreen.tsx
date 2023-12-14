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
});

export default WrongNoteScreen;
