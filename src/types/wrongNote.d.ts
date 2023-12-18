type WrongAnswer = {
  question: string;
  userAnswer: string;
  correct_answer: string;
};

type QuizResult = {
  date: string;
  wrongAnswers: WrongAnswer[];
};
