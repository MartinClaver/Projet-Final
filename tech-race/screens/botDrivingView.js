import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Circle, Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';
import CarsAlert from '../assets/CarsAlert.svg';
import Engine from '../assets/Engine.svg';
import Sos from '../assets/Sos.svg';

const BotDrivingView = () => {
  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

  const [start, setStart] = useState(false);
  const [hasObstable, setHasObstable] = useState(false);
  const [isOutOfBattery, setIsOutOfBattery] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const handlePress = () => {
    setStart(!start);
  };
  
  return (
    <View style={styles.bigContainer}>
      <View style={styles.videoContainer}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.timer}>00:00:00</Text>

        <View style={styles.sectionButton}>

          <View style={styles.buttonContainer}>
            <Svg height="120" width="120" style={styles.svg}>
              <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor={start ? "#FF6F61": "#00C99C"} stopOpacity="1" />
                  <Stop offset="100%" stopColor={start ? "#B22222": "#00634D" } stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Circle cx="60" cy="60" r="55" stroke="url(#grad)" strokeWidth="5" fill="none" />
            </Svg>
            <TouchableOpacity style={styles.buttonStart} onPress={handlePress}>
              <Text style={styles.buttonText}>{start ? "Stop" : "Start"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rightContainer}>
            <CarsAlert width={50} height={50} stroke={hasObstable ? "#FF8A00" : "white"}/>
            <Engine width={50} height={50} stroke={isOutOfBattery ? "#FF8A00" : "white"}/> 
            <Sos width={50} height={50} stroke={isLost ? "#FF8A00" : "white"}/>             
          </View>
        </View>
      
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  timer: {
    fontSize: 24,
    color: "white",
  },
  sectionButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: "100%",
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  buttonStart: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  icon: {
    marginBottom: 20,
  },
});

export default BotDrivingView;