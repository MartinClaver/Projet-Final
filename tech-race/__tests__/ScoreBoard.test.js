import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ScoreBoard from '../screens/ScoreBoard';

const mockNavigation = { navigate: jest.fn() };
jest.mock('../components/CustomPressable', () => {
  return (props) => (
    <>{props.children}</>
  );
});

jest.mock('../supabaseClient', () => ({
    supabase: {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({
        data: [
          { id: 1, created_at: '2024-09-10', total_time: 120 },
          { id: 2, created_at: '2024-09-11', total_time: 150 },
        ],
        error: null
      })
    }
  }));

test('The sort button correctly changes order', async () => {
    const { getByTestId, findByTestId } = render(<ScoreBoard navigation={mockNavigation} />);
    const sortButton = getByTestId('sort-button');

    expect((await findByTestId('sort-button-text')).props.children.join('')).toBe('Time : ↓ Desc');
    fireEvent.press(sortButton);
    expect((await findByTestId('sort-button-text')).props.children.join('')).toBe('Time : ↑ Asc');
  });
  