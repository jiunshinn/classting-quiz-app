import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';

export type WrongNoteScreenProps = StackScreenProps<
  RootNavigationType,
  'WrongNote'
>;

const WrongNoteScreen = () => {
  return (
    <View>
      <Text>오답 노트 페이지</Text>
      {/* 오답 노트 리스트 */}
    </View>
  );
};

export default WrongNoteScreen;
