import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import DrillSelectScreen from '../DrillSelectScreen';
import StartScreen from '../StartScreen';

describe('prototype navigation', () => {
  it('opens the drill selector from the start screen', () => {
    const navigate = jest.fn();
    const { getByText } = render(<StartScreen navigation={{ navigate }} />);

    fireEvent.press(getByText('Start Drill'));

    expect(navigate).toHaveBeenCalledWith('DrillSelect');
  });

  it('opens the selected drill', () => {
    const navigate = jest.fn();
    const { getByText } = render(<DrillSelectScreen navigation={{ navigate }} />);

    fireEvent.press(getByText('W-Drill'));

    expect(navigate).toHaveBeenCalledWith('DrillRun', {
      drill: { id: 'w', name: 'W-Drill' },
    });
  });
});
