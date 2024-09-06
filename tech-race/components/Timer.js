import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

export const formatTime = (seconds) => {
  const getSeconds = `0${seconds % 60}`.slice(-2);
  const minutes = Math.floor(seconds / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
  return `${getHours}:${getMinutes}:${getSeconds}`;
};

const Timer = ({ isRunning, resetTimer, timer, setTimer, isMoving,  setMotionTimer, motionTimer }) => {

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  useEffect(() => {
    let interval_motion;
    if (isMoving) {
      interval_motion = setInterval(() => {
        setMotionTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (!isMoving && motionTimer !== 0) {
      clearInterval(interval_motion);
    }
    return () => clearInterval(interval_motion);
  }, [isMoving, motionTimer]);

  useEffect(() => {
    if (resetTimer) {
      setTimer(0);
      setMotionTimer(0);
    }
  }, [resetTimer]);

  return (
    <Text style={styles.timer}>{formatTime(timer)}</Text>
  );
};

const styles = StyleSheet.create({
  timer: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Timer;
