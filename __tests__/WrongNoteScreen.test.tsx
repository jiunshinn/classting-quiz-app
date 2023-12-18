import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import WrongNoteScreen from '../src/screens/WrongNoteScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

const mockQuizResults = [
  {
    date: '2023-03-01',
    wrongAnswers: [
      {
        question: 'What is the capital of France?',
        userAnswer: 'Berlin',
        correct_answer: 'Paris',
      },
    ],
  },
];

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(JSON.stringify(mockQuizResults))),
}));

describe('WrongNote screen 컴포넌트 테스트', async () => {
  const mockNavigate = jest.fn();
  const props: {
    navigation: StackNavigationProp<RootNavigationType, 'WrongNote'>;
    route: RouteProp<RootNavigationType, 'WrongNote'>;
  } = {
    navigation: {
      navigate: mockNavigate,
      goBack: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      setOptions: jest.fn(),
    } as any,
    route: {
      key: 'mockKey',
      name: 'WrongNote',
      params: {},
    },
  };

  test('오답노트 선택 시 랜더링 테스트', async () => {
    const {getByText, findByText} = render(<WrongNoteScreen {...props} />);

    const dateButton = await findByText('2023-03-01에 푼 퀴즈 오답노트 확인');
    await waitFor(() => {
      fireEvent.press(dateButton);
      expect(getByText('What is the capital of France?')).toBeTruthy();
      expect(getByText('내가 고른 정답 : Berlin')).toBeTruthy();
      expect(getByText('실제 정답 : Paris')).toBeTruthy();
    });
  });
});
