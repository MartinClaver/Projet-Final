import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const EndedRace = () => {
  return (
    <View style={styles.container}>
      <Image source="../img/HOmeLogo.svg"/>
      <Text>RACE SUMMARY</Text>
      <Image source="../img/carImage.png"
      />
      <View>
      <Text>Timer</Text>
      </View>
      <View>
        <Text>Average Speed</Text>
        <Text>Max Speed</Text>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EndedRace;