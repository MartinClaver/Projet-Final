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
        <View style={styles.titleView}>
          <Text style={styles.title}>RACE SUMMARY</Text> 
        </View>
      </View>
      <View style={styles.body}>
        <Image source={require('../assets/carImage.png')} style={styles.carImage}/>
        <View style={styles.stats}>
          <View style={styles.timer}>
            <Text style={styles.statTitle}>Timer</Text>
            <Text style={styles.data}>Data</Text>
          </View>
          <View style={styles.speed}>
            <View style={styles.statsContainer}>
              <Text style={styles.statTitle}>Average Speed</Text>
              <Text style={styles.data}>Data</Text>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.statTitle}>Max Speed</Text>
              <Text style={styles.data}>Data</Text>
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
    justifyContent: 'center',
  },
  header: {
    paddingTop: 60,
    flexDirection: 'row',
  },
  homeLogo: {
    position: 'absolute',
    top: 20,
    left: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#24E8A0',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  stats: {
    flexDirection: 'column',
  },
  timer: {
    backgroundColor: '#24E8A0',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    width: 225,
    height: 100,
  },
  statsContainer: {
    backgroundColor: '#24E8A0',
    borderRadius: 20,
    width: 100,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  statTitle: {
    fontSize: 12,
  },
  data: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  carImage: {
    width: 280,
    height: 280,
  },
});

export default EndedRace;
