import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

const Timer = ({ isRunning, resetTimer, timer, setTimer }) => {

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
    if (resetTimer) {
      setTimer(0);
    }
  }, [resetTimer]);

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

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
