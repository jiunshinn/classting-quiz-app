import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import QuizPage from '../screens/QuizPage';
import WrongNotePage from '../screens/WrongNotePage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{title: '홈', headerShown: false}}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizPage}
          options={{title: '퀴즈 풀기'}}
        />
        <Stack.Screen
          name="WrongNote"
          component={WrongNotePage}
          options={{title: '오답 노트'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
