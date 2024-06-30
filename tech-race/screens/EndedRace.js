import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import HomeLogo from "../assets/HomeLogo.svg";

const EndedRace = () => {
  return (
    <View style={styles.container}>
      <HomeLogo width={80} height={80}/>
      <Text>RACE SUMMARY</Text>
      {/* <Image source={require('../assets/carImage.png')} width={120} height={120} /> */}
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
    width: '258px',
    height: '258px',
  },
});

export default EndedRace;
