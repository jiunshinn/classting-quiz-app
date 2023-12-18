import {act, render} from '@testing-library/react-native';
import QuizScreen from '../src/screens/QuizScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  return Object.setPrototypeOf(
    {
      Alert: {
        ...RN.Alert,
        alert: jest.fn(),
      },
    },
    RN,
  );
});

describe('QuizScreen 컴포넌트 테스트', () => {
  const mockNavigate = jest.fn();
  const props: {
    navigation: StackNavigationProp<RootNavigationType, 'Quiz'>;
    route: RouteProp<RootNavigationType, 'Quiz'>;
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
      name: 'Quiz',
      params: {},
    },
  };

  test('컴포넌트 스냅샷 테스트', async () => {
    jest.useFakeTimers();
    const rendered = render(<QuizScreen {...props} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
