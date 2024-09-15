import React from 'react';
import { render, screen } from '@testing-library/react-native';
import EndedRace from '../screens/EndedRace';
import { formatTime } from '../components/Timer';

const mockNavigation = { navigate: jest.fn() };
const route = {
    params: {
      timer: 10,
      motionTimer: 5,}
}
jest.mock('../metro.config', () => ({
    SUPABASE_URL: 'http://localhost/', // mock the URL
    SUPABASE_API_KEY: 'mock-api-key',  // mock the API key
  }));

test('renders correctly with props', () => {  
  const formattedTimer = formatTime(route.params.timer.toString());
  const formattedMotionTimer = formatTime(route.params.motionTimer.toString());
  render(<EndedRace navigation={mockNavigation} route={route} />);
  expect(screen.getByText(formattedTimer)).toBeTruthy();
  expect(screen.getByText(formattedMotionTimer)).toBeTruthy();
});