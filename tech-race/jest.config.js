// Fichier de configuration Jest Coté Front
module.exports = {
  setupFiles: ['<rootDir>/jest-setup/setup.js'],
    preset: 'react-native',
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(expo-modules-core|react-native|@react-native|@react-navigation|@react-native-community|reactNativeGestureHandlerMock)/)',
    ],
    moduleNameMapper: {
      '\\.svg$': '<rootDir>/jest-setup/svgTransform.js',
      '^reactNativeGestureHandlerMock$': '<rootDir>/mocks/reactNativeGestureHandlerMock.js',
      '^./components/CustomPressable$': '<rootDir>/mocks/customPressableMock.js',
    },
  };
  