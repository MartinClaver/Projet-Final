import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import LeftArrow from '../assets/LeftArrow.svg';
import RightArrow from '../assets/RightArrow.svg';
import LeftPedal from '../assets/LeftPedal.svg';
import RightPedal from '../assets/RightPedal.svg';
import StopSVG from '../assets/StopSVG.svg';
import Klaxon from '../assets/Klaxon.svg';
import * as ScreenOrientation from 'expo-screen-orientation';
import Timer from '../components/Timer';
import CustomPressable from '../components/CustomPressable';
import { SafeAreaView } from 'react-native-safe-area-context';

const ManualDrivingScreen = ({ navigation }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [isArrowPressed, setArrowPressed] = useState(false);
  const [isPedalPressed, setPedalPressed] = useState(false);

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
    if(isArrowPressed && isPedalPressed) {
      goBackAndTurn(direction);
    } else {    const message = {
      cmd: 1,
      data: direction === "back" ? [-1, -1, -1, -1] : [1, 1, 1, 1],
    };
    ws.send(JSON.stringify(message));
    console.log('Message sent:', message);}
  }

  const goLeftOrRigth = (direction) => {
    if(isArrowPressed && isPedalPressed) {
      goForwardAndTurn(direction);
    } else {
      const message = {
        cmd: 1,
        data: direction === "left" ? [-1, -1, 1, 1] : [1, 1, -1, -1],
      };
      ws.send(JSON.stringify(message));
      console.log('Message sent:', message);
      
    }
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

  const onPressIn = () => {
    setArrowPressed(true);
    setPedalPressed(true);
  }

  const onPressOut = () => {
    setArrowPressed(false);
    setPedalPressed(false);
  }

  const goForwardAndTurn = (direction) => {
    const message = {
        cmd: 1,
        data: direction === "left" ? [-1, 1, 1, 1] : [1, 1, -1, 1],
      };
      ws.send(JSON.stringify(message));
      console.log('Message sent:', message);
  }

    const goBackAndTurn = (direction) => {
      const message = {
        cmd: 1,
        data: direction === "back" ? [1, -1, -1, -1] : [-1, -1, 1, -1],
      };
      ws.send(JSON.stringify(message));
      console.log('Message sent:', message);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.stopButton} onPressIn={handleStopPress}>
        <StopSVG />
      </TouchableOpacity>
      <Timer isRunning={isRunning} resetTimer={resetTimer} />
      <View style={styles.controls}>
        <View style={styles.arrows}>
          <CustomPressable onPressOut={() =>  setArrowPressed(false)} onPressIn={() => setArrowPressed(true)} onBegin={() => goLeftOrRigth('left')} onEnd={stopEverything} onFinalize={stopEverything} children={<LeftArrow style={styles.arrowButton}/>} />
          <CustomPressable onPressOut= {() =>  setArrowPressed(false)} onPressIn={() => setArrowPressed(true)} onBegin={() => goLeftOrRigth()} onEnd={stopEverything} onFinalize={stopEverything} children={<RightArrow style={styles.arrowButton}/>} />
        </View>
        <View style={styles.klaxonButton}>
         <CustomPressable onBegin={klaxon} onEnd={klaxonOut} onFinalize={klaxonOut} children={<Klaxon/>} />
        </View>
        
        <View style={styles.pedals}>
          <View style={styles.leftPedal}>
          <CustomPressable onPressOut= {() =>  setPedalPressed(false)} onPressIn={() => setPedalPressed(true)} onBegin={() => goBackForWard('back')} onEnd={() => stopEverything} onFinalize={stopEverything} children={<LeftPedal/>} />
          </View>
          <CustomPressable onPressOut= {() =>  setPedalPressed(false)} onPressIn={() => setPedalPressed(true)} onBegin={handleRightPedalPress} onEnd={() => stopEverything} onFinalize={stopEverything} children={<RightPedal/>} />
        </View>
      </View>
    </SafeAreaView>
    
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
  klaxonButton: {
    position: 'absolute',
    bottom: 20,
    left: 350,
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
  pedals: {
    left: -20,
    flexDirection: 'row',
    marginLeft: 30,
  },
  leftPedal: {
    marginRight: 25,
    bottom: -50
  },
});

export default ManualDrivingScreen;
