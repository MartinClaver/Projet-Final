import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect } from 'react';
import HomeLogo from "../assets/HomeLogo.svg";
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
      <View style={styles.header}>
        <View style={styles.homeLogo}>
          <HomeLogo  />
        </View>
        <Text style={styles.text}>RACE SUMMARY</Text> 
      </View>
      <View style={styles.body}>
        <Image source={require('../assets/carImage.png')} style={styles.carImage}/>
        <View style={styles.stats}>
          <View style={styles.statsContainer}>
            <Text>Timer</Text>
          </View>
          <View style={styles.speed}>
            <View style={styles.statsContainer}>
              <Text>Average Speed</Text>
            </View>
            <View style={styles.statsContainer}>
              <Text>Max Speed</Text>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  homeLogo: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  body: {
    flexDirection: 'row',
  },
  stats: {
    flexDirection: 'column',
  },
  statsContainer: {
    backgroundColor: '#24E8A0',
  },
  speed: {
    flexDirection: 'row',
  },
  carImage: {
    width: 140,
    height: 140,
  },
});

export default EndedRace;
