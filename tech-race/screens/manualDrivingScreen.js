import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LeftArrow from '../assets/LeftArrow.svg';
import RightArrow from '../assets/RightArrow.svg';
import LeftPedal from '../assets/LeftPedal.svg';
import RightPedal from '../assets/RightPedal.svg';
import StopSVG from '../assets/StopSVG.svg';
import * as ScreenOrientation from 'expo-screen-orientation';
import Timer from '../components/Timer';

const ManualDrivingScreen = ({ navigation }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.43.136/ws');
    setWs(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (e) => {
      console.log('Received:', e.data);
    };

    ws.onerror = (e) => {
      console.log('WebSocket error:', e.message);
    };

    ws.onclose = (e) => {
      console.log('WebSocket closed:', e.code, e.reason);
    };

    return () => {
      ws.close();
    };
  }, []);

  const goBackForWard = (direction) => {
    const message = {
      cmd: 1,
      data: direction === "back" ? [-1, -1, -1, -1] : [1, 1, 1, 1],
    };
    ws.send(JSON.stringify(message));
    console.log('Message sent:', message);
  }

  const goLeftOrRigth = (direction) => {
    const message = {
      cmd: 1,
      data: direction === "left" ? [-1, -1, 1, 1] : [1, 1, -1, -1],
    };
    ws.send(JSON.stringify(message));
    console.log('Message sent:', message);
  }

  const stopEverything = () => {
    const message = {
      cmd: 1,
      data: [0, 0, 0, 0],
    };
    ws.send(JSON.stringify(message));
    console.log('Message sent:', message);
  }

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const handleStopPress = () => {
    setIsRunning(false);
    setResetTimer(true);
    navigation.navigate('EndedRace');
  };

  const klaxon = () => {
    const message = {
      cmd: 7,
      data: 1,
    };
    ws.send(JSON.stringify(message));
    console.log('Message sent:', message);
  }

  const klaxonOut = () => {
    const stopMessage = {
      cmd: 7,
      data: 0,
    };
    ws.send(JSON.stringify(stopMessage));
  }

  const handleRightPedalPress = () => {
    setIsRunning(true);
    setResetTimer(false);
    goBackForWard();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.stopButton} onPressIn={klaxon} onPressOut={klaxonOut}>
        <StopSVG />
      </TouchableOpacity>
      <Timer isRunning={isRunning} resetTimer={resetTimer} />
      <View style={styles.controls}>
        <View style={styles.arrows}>
          <TouchableOpacity style={styles.arrowButton} onPressIn={() => goLeftOrRigth("left")} onPressOut={stopEverything}>
            <LeftArrow style={styles.leftArrowSVG} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowButton} onPressIn={() => goLeftOrRigth()} onPressOut={stopEverything}>
            <RightArrow style={styles.leftArrowSVG} />
          </TouchableOpacity>
        </View>
        <View style={styles.pedals}>
          <TouchableOpacity style={styles.leftPedal} onPressIn={() => goBackForWard("back")} onPressOut={stopEverything}>
            <LeftPedal style={styles.leftPedalSVG} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pedalButton} onPressIn={handleRightPedalPress} onPressOut={stopEverything}>
            <RightPedal style={styles.rightPedalSVG} />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  stopButton: {
    position: 'absolute',
    top: 20,
    top: 20,
    left: 10,
    padding: 10,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  arrows: {
    bottom: -50,
    bottom: -50,
    flexDirection: 'row',
  },
  arrowButton: {
    marginLeft: 10,
    margin: 5,
  },
  leftArrowSVG: {
    width: 64,
    height: 64,
    fill: "white"
  },
  rightArrowSVG: {
    width: 64,
    height: 64,
    fill: "white"
  },
  pedals: {
    left: -20,
    flexDirection: 'row',
    marginLeft: 30,
  },
  leftPedal: {
    marginRight: 25,
    bottom: -50
  },
  leftPedalSVG: {
    width: 100,
    height: 100,
    fill: "white"
  },
  rightPedalSVG: {
    width: 130,
    height: 130,
    fill: "white",
    marginRight: 25,
  },
  leftPedalSVG: {
    width: 100,
    height: 100,
    fill: "white"
  }
});

export default ManualDrivingScreen;
