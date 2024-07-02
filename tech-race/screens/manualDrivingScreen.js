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
    navigation.goBack();
  };

  const handleRightPedalPress = () => {
    setIsRunning(true);
    setResetTimer(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.stopButton} onPress={handleStopPress}>
        <StopSVG/>
      </TouchableOpacity>
      <Timer isRunning={isRunning} resetTimer={resetTimer} />
      <View style={styles.controls}>
        <View style={styles.arrows}>
          <TouchableOpacity style={styles.arrowButton}>
            <LeftArrow style={styles.leftArrowSVG} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowButton}>
            <RightArrow style={styles.leftArrowSVG} />
          </TouchableOpacity>
        </View>
        <View style={styles.pedals}>
          <TouchableOpacity style={styles.leftPedal}>
            <LeftPedal style={styles.leftPedalSVG}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pedalButton} onPressIn={handleRightPedalPress}>
            <RightPedal style={styles.rightPedalSVG}/>
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
width:100,
height:100,
fill:"white"
},
rightPedalSVG: {
  width:130,
  height:130,
  fill:"white",
  marginRight: 25,
},
leftPedalSVG: {
width:100,
height:100,
fill:"white"
}
});

export default ManualDrivingScreen;
