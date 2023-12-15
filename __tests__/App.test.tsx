/**
 * @format
 */

import 'react-native';
import React, {ReactElement} from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

jest.mock('react-native-gesture-handler', () => ({
  ...jest.requireActual('react-native-gesture-handler'),
  GestureHandlerRootView: 'View',
}));

it('renders correctly', () => {
  renderer.create(<App />);
});

let props;
let component: React.ReactElement;

function getTempComponent(props: any): React.ReactElement {
  return <App {...props} />;
}

// test 그룹핑
describe('App 컴포넌트 테스트', () => {
  props = {};
  component = getTempComponent(props);
  // test == it(readable)
  test('컴포넌트 렌더링 테스트', () => {
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
