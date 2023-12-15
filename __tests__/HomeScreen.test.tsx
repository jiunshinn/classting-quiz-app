import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../src/screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<RootNavigationType>();

describe('HomeScreen 컴포넌트 테스트', () => {
  test('컴포넌트 렌더링 테스트', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(getByText('CLASSTING QUIZ')).toBeDefined();
    expect(getByText('퀴즈 풀기')).toBeDefined();
    expect(getByText('오답 노트 확인')).toBeDefined();
  });

  test('퀴즈 풀기 버튼 클릭 테스트', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const {getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const quizButton = getByText('퀴즈 풀기');
    fireEvent.press(quizButton);

    expect(navigation.navigate).toHaveBeenCalledWith('QuizScreen');
  });

  test('오답 노트 확인 버튼 클릭 테스트', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const {getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const wrongNoteButton = getByText('오답 노트 확인');
    fireEvent.press(wrongNoteButton);

    expect(navigation.navigate).toHaveBeenCalledWith('WrongNoteScreen');
  });
});
