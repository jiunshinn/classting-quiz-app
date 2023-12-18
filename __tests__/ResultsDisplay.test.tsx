import ResultsDisplay from '../src/components/ResultDisplay';
import {render} from '@testing-library/react-native';
import {formatTime} from '../src/utils/formatTime';

describe('ResultsDisplay 컴포넌트 테스트', () => {
  test('컴포넌트 렌더링 테스트', () => {
    const totalQuestions = 10;
    const correctCount = 7;
    const elapsedTime = 1000;

    const {getByText} = render(
      <ResultsDisplay
        totalQuestions={totalQuestions}
        correctCount={correctCount}
        elapsedTime={elapsedTime}
      />,
    );

    expect(getByText(`총 퀴즈 개수: ${totalQuestions}`)).toBeDefined();
    expect(getByText(`정답: ${correctCount}`)).toBeDefined();
    expect(getByText(`오답: ${totalQuestions - correctCount}`)).toBeDefined();
    expect(getByText(`소요시간: ${formatTime(elapsedTime)}`)).toBeDefined();
  });
});

function getTempComponent(props: any): React.ReactElement {
  return <ResultsDisplay {...props} />;
}

let props;
let component: React.ReactElement;

describe('ResultsDisplay 컴포넌트 스냅샷 테스트', () => {
  props = {};
  component = getTempComponent(props);

  test('컴포넌트 렌더링 테스트', () => {
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
