import React from 'react';
import { act, render, waitFor } from '@testing-library/react-native';
import { Audio } from 'expo-av';
import DrillRunScreen from '../DrillRunScreen';

jest.mock('../../Components/SignalEffect', () => () => null);
jest.mock('expo-av', () => ({
  Audio: {
    Sound: {
      createAsync: jest.fn(),
    },
  },
}));

describe('DrillRunScreen', () => {
  const sound = {
    replayAsync: jest.fn().mockResolvedValue(undefined),
    unloadAsync: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    Audio.Sound.createAsync.mockResolvedValue({ sound });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('runs exactly five break signals and releases its audio resource', async () => {
    const screen = render(
      <DrillRunScreen route={{ params: { drill: { name: 'W-Drill' } } }} />
    );

    await waitFor(() => expect(Audio.Sound.createAsync).toHaveBeenCalledTimes(1));

    await act(async () => {
      jest.advanceTimersByTime(5 * 1500);
    });

    expect(screen.getByText('W-Drill')).toBeTruthy();
    expect(screen.getByText('5/5')).toBeTruthy();
    expect(sound.replayAsync).toHaveBeenCalledTimes(5);

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });
    expect(sound.replayAsync).toHaveBeenCalledTimes(5);

    screen.unmount();
    expect(sound.unloadAsync).toHaveBeenCalledTimes(1);
  });
});
