import React, {useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {getQuizList} from '../api/quizApi';
import BasicButton from '../components/BasicButton';
import {SafeAreaView} from 'react-native-safe-area-context';

import StatusBar from '../components/StatusBar';
import BaseLoading from '../components/Loading';
import {StackScreenProps} from '@react-navigation/stack';
import {colors, fontSize, radius, spacing} from '../constants/\btheme';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {decodeHTMLEntities} from '../utils/decodeHtml';

export type QuizScreenProps = StackScreenProps<RootNavigationType, 'Quiz'>;

function QuizScreen({navigation}: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    getchQuizData();
    setupTimer();
  }, []);

  const getchQuizData = async () => {
    try {
      const data = await getQuizList();
      setQuizQuestions(data);
    } catch (error) {
      console.error('ERROR FETCHING QUIZ DATA : ', error);
      Alert.alert(
        'ERROR',
        '퀴즈 정보를 가져오는데 실패했습니다.\n잠시 후 시도해주세요',
      );
    }
    setIsLoading(false);
  };

  const setupTimer = () => {
    const interval = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const handleAnswer = () => {
    if (!selectedAnswer) {
      Alert.alert('알림', '정답을 선택해주세요.');
      return;
    }

    setIsAnswerChecked(true);
    const isAnswerCorrect = selectedAnswer === currentQuestion.correct_answer;
    if (isAnswerCorrect) {
      setCorrectCount(correctCount + 1);
    } else {
      setWrongAnswers([...wrongAnswers, currentQuestion]);
    }
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  const finishQuiz = async () => {
    const wrongResults = quizQuestions
      .map((question, index) => ({
        ...question,
        userAnswer: userAnswers[index],
        isCorrect: userAnswers[index] === question.correct_answer,
        questionId: index + 1,
      }))
      .filter(question => !question.isCorrect);

    const quizResult = {
      date: new Date().toISOString(),
      wrongAnswers: wrongResults,
    };

    try {
      const existingResults = await AsyncStorage.getItem('wrongQuizResults');
      const updatedResults = existingResults
        ? [...JSON.parse(existingResults), quizResult]
        : [quizResult];
      await AsyncStorage.setItem(
        'wrongQuizResults',
        JSON.stringify(updatedResults),
      );
      navigation.replace('Result', {
        correctCount,
        totalQuestions: quizQuestions.length,
        elapsedTime: timer,
      });
    } catch (error) {
      console.error('저장 실패', error);
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (isLoading || !quizQuestions.length) {
    return <BaseLoading />;
  }

  const renderOptionsView = () => {
    const options = currentQuestion.incorrect_answers.concat(
      currentQuestion.correct_answer,
    );
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.option}
        onPress={() => setSelectedAnswer(option)}>
        <View
          style={
            selectedAnswer === option ? styles.radioSelected : styles.radio
          }
        />
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  const renderResultView = () => {
    return (
      <Text
        style={
          selectedAnswer === currentQuestion.correct_answer
            ? styles.correctAnswer
            : styles.wrongAnswer
        }>
        {selectedAnswer === currentQuestion.correct_answer
          ? '정답입니다!'
          : '틀렸습니다!'}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        elapsedTime={timer}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quizQuestions.length}
      />
      <Text style={styles.question}>
        {decodeHTMLEntities(currentQuestion.question)}
      </Text>
      {isAnswerChecked ? (
        <>
          {renderResultView()}
          <View style={styles.buttonContainer}>
            <BasicButton title="다음" onPress={() => handleNextQuestion()} />
          </View>
        </>
      ) : (
        <>
          {renderOptionsView()}
          <BasicButton title="확인" onPress={() => handleAnswer()} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
  },
  correctAnswer: {
    color: colors.main,
    fontSize: fontSize.large,
  },
  wrongAnswer: {
    color: colors.error,
    fontSize: fontSize.large,
  },
  question: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginVertical: spacing.medium,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.medium,
  },
  radio: {
    height: spacing.medium,
    width: spacing.medium,
    borderRadius: radius.medium,
    borderWidth: 2,
    borderColor: colors.black,
    marginRight: spacing.medium,
  },
  radioSelected: {
    height: spacing.medium,
    width: spacing.medium,
    borderRadius: radius.medium,
    borderWidth: 2,
    borderColor: colors.main,
    marginRight: spacing.medium,
  },
  optionText: {},
  buttonContainer: {
    marginVertical: spacing.small,
  },
});

export default QuizScreen;
