import {StackNavigationProp} from '@react-navigation/stack';
import HomeScreen from '../src/screens/HomeScreen';
import {RouteProp} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';

describe('HomeScreen 컴포넌트 테스트', () => {
  const mockNavigate = jest.fn();
  const props: {
    navigation: StackNavigationProp<RootNavigationType, 'Home'>;
    route: RouteProp<RootNavigationType, 'Home'>;
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
      name: 'Home',
      params: {},
    },
  };

  test('컴포넌트 스냅샷 테스트', () => {
    const rendered = render(<HomeScreen {...props} />);

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  test('컴포넌트 렌더링 테스트', () => {
    const {getByText} = render(<HomeScreen {...props} />);
    const quizButtonElement = getByText('퀴즈 풀기');
    const wrongAnswerButtonElement = getByText('오답 노트 확인');

    expect(quizButtonElement).toBeDefined();
    expect(wrongAnswerButtonElement).toBeDefined();

    fireEvent.press(quizButtonElement);
    fireEvent.press(wrongAnswerButtonElement);

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });
});
