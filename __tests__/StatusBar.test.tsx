import {render} from '@testing-library/react-native';
import StatusBar from '../src/components/StatusBar';

describe('StatusBar 컴포넌트 테스트', () => {
  test('컴포넌트 렌더링 테스트', () => {
    const elapsedTime: number = 0;
    const currentQuestionIndex: number = 0;
    const totalQuestions: number = 0;

    const {getByText} = render(
      <StatusBar
        elapsedTime={elapsedTime}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />,
    );
    const statusBarElement = getByText('소요시간: 00:00:00');

    expect(statusBarElement).toBeDefined();
  });
});
