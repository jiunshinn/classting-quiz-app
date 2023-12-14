type RootNavigationType = {
  Home: undefined;
  Quiz: undefined;
  Result: {
    correctCount: number;
    totalQuestions: number;
    elapsedTime: number;
  };
  WrongNote: undefined;
};
