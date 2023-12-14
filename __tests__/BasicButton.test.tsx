import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import BasicButton from '../src/components/BasicButton';

describe('BasicButton 컴포넌트 테스트', () => {
  test('컴포넌트 렌더링 테스트', () => {
    const {getByText} = render(
      <BasicButton title="테스트 버튼" onPress={() => {}} />,
    );
    const buttonElement = getByText('테스트 버튼');

    expect(buttonElement).toBeDefined();
  });

  test('버튼 클릭 이벤트 테스트', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <BasicButton title="테스트 버튼" onPress={onPressMock} />,
    );
    const buttonElement = getByText('테스트 버튼');

    fireEvent.press(buttonElement);

    expect(onPressMock).toHaveBeenCalled();
  });
});
