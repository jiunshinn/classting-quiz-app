import {render} from '@testing-library/react-native';
import QuizScreen from '../src/screens/QuizScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

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

  test('컴포넌트 렌더링 테스트', () => {
    const rendered = render(<QuizScreen {...props} />);

    // Add assertions to verify if specific elements are rendered
    // For example, you can check for the presence of certain text or buttons
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
