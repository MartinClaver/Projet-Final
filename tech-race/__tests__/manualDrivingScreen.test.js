import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ManualDrivingScreen from '../screens/manualDrivingScreen';

const mockNavigation = { navigate: jest.fn() };
jest.mock('../components/CustomPressable', () => {
  return (props) => (
    <>{props.children}</>
  );
});

test('should render ManualDrivingScreen correctly', () => {
    render(<ManualDrivingScreen navigation={mockNavigation} />);
    
    expect(screen.getByTestId('stop-button')).toBeTruthy();
    expect(screen.getByText(/(\d{2}:\d{2}:\d{2})/)).toBeTruthy();
  });


