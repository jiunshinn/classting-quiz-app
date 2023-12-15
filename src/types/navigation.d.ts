type RootNavigationType = {
  Home;
  Quiz;
  Result: {
    correctCount: number;
    totalQuestions: number;
    elapsedTime: number;
  };
  WrongNote;
};
