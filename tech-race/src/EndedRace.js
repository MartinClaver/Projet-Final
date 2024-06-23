import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function EndedRace() {
  return (
    <View style={styles.container}>
      <Text>RACE SUMMARY</Text>
      <Image source="../img/carImage.png"
      />
      <View></View>
      <View></View>
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
