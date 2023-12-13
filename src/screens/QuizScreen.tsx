import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {getQuizList} from '../api/quizApi';
import BasicButton from '../components/BasicButton';
import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import spacing from '../constants/spacing';
import radius from '../constants/radius';
import StatusBar from '../components/StatusBar';
import BaseLoading from '../components/Loading';

function QuizScreen({navigation}: any) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const getchQuizData = async () => {
      try {
        const data = await getQuizList();
        setQuizQuestions(data);
      } catch (error) {
        console.error('ERROR FETCHING QUIZ DATA : ', error);
        Alert.alert('ERROR', '퀴즈 정보를 가져오는데 실패했습니다.');
      }
      setIsLoading(false);
    };
    getchQuizData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswer = () => {
    if (!selectedAnswer) {
      Alert.alert('알림', '정답을 선택해주세요.');
      return;
    }

    setIsAnswerChecked(true);
    if (selectedAnswer === currentQuestion.correct_answer) {
      setCorrectCount(correctCount + 1);
    } else {
      setWrongAnswers([...wrongAnswers, currentQuestion]);
    }
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
    // await AsyncStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
    navigation.navigate('ResultScreen', {correctCount: 1, totalQuestions: 10});
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (isLoading || !quizQuestions.length) {
    return <BaseLoading />;
  }

  const renderOptions = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        elapsedTime={timer}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quizQuestions.length}
      />
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {isAnswerChecked ? (
        <>
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
          <View style={styles.buttonContainer}>
            <BasicButton title="다음" onPress={handleNextQuestion} />
          </View>
        </>
      ) : (
        <>
          {renderOptions()}
          <BasicButton
            title="확인"
            onPress={() => handleAnswer(selectedAnswer!)}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '80%',
    marginVertical: spacing.small,
  },
});

export default QuizScreen;
