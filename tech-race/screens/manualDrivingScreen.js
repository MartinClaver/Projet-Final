import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LeftArrow from '../assets/LeftArrow.svg';
import RightArrow from '../assets/RightArrow.svg';
import LeftPedal from '../assets/LeftPedal.svg';
import RightPedal from '../assets/RightPedal.svg';

const ManualDrivingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.stopButton} onPress={() => navigation.goBack()}>
    <Image source={require('../assets/StopButton.png')} style={styles.stopButtonImage} />
    </TouchableOpacity>
    <Text style={styles.timer}>00:00:00</Text>
    <View style={styles.controls}>
      <View style={styles.arrows}>
        <TouchableOpacity style={styles.arrowButton}>
        <LeftArrow width={64} height={64} fill="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowButton}>
        <RightArrow width={64} height={64} fill="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.pedals}>
        <TouchableOpacity style={styles.leftPedal}>
          <LeftPedal width={100} height={100} fill="white"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pedalButton}>
        <RightPedal width={130} height={130} fill="white"/>
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
  top: 10,
  left: 10,
  padding: 10,
},
timer: {
  position: 'absolute',
  top: 40,
  alignSelf: 'center',
  color: 'white',
  fontSize: 24,
  fontWeight: 'bold',
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
  bottom: -40,
  flexDirection: 'row',
},
arrowButton: {
 margin: 5,
},
pedals: {
  left: -20,
  flexDirection: 'row',
  marginLeft: 30,
},
leftPedal: {
  marginRight: -25,
  bottom: -30
}
});

export default ManualDrivingScreen;
