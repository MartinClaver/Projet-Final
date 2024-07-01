import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect } from 'react';
import Svg, { Defs, LinearGradient, Stop, start, Circle } from 'react-native-svg';
import HomeLogo from "../assets/Group1.svg";
import * as ScreenOrientation from 'expo-screen-orientation';

const EndedRace = () => {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
  
    lockOrientation();
  
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
  return (
    <View style={styles.container}>
      {/* <HomeLogo width={80} height={80} fill='white'/> */}
      <Svg height="120" width="120" style={styles.svg}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={start ? "#FF6F61": "#00C99C"} stopOpacity="1" />
            <Stop offset="100%" stopColor={start ? "#B22222": "#00634D" } stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle cx="60" cy="60" r="55" stroke="url(#grad)" strokeWidth="5" fill="none" />
      </Svg>
      <Text>RACE SUMMARY</Text>
      <Image source={require('../assets/carImage.png')} style={styles.carImage}/>
      <View style={styles.statsContainer}>
      <Text>Timer</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text>Average Speed</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text>Max Speed</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flex: 1,
    backgroundColor: '#24E8A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeLogo: {
    width: '80px',
    height: '80px',
  },
  carImage: {
    width: '120px',
    height: '120px',
  },
});

export default EndedRace;
