import {render} from '@testing-library/react-native';
import QuizScreen from '../src/screens/QuizScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {Alert, Text, TouchableOpacity, View} from 'react-native';

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

  test('컴포넌트 스냅샷 테스트', () => {
    const rendered = render(<QuizScreen {...props} />);

    // Add assertions to verify if specific elements are rendered
    // For example, you can check for the presence of certain text or buttons
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
