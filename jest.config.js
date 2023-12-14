module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
