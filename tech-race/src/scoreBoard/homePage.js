import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import LogoApp from '../assets/LogoApp.svg';
import Scores from '../assets/Scores.svg';
import Automatic from '../assets/Automatic.svg';
import Manual from '../assets/Manual.svg';
import ButtonDefault from '../components/ButtonDefault';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import scoreBoard from './scoreBoard';

const HomePage = () => {
  const navigation = useNavigation();
  const [isManual, setIsManual] = useState(true)

  const displayScoreboard = () => {
    navigation.navigate('Scoreboard');
  }

  return (
    
    <SafeAreaView style={styles.container}>
    	<View style={styles.header}>
        	<View style={styles.svgLogo}>
        		<LogoApp/>
        	</View>
			<View style={styles.svgScores}>
        <TouchableOpacity onPress={displayScoreboard}>
          <Scores />
        </TouchableOpacity>
			</View>
      	</View>
		<Image
			source={require('../assets/Car.png')}
			style={styles.image}
			resizeMode="contain"
		/>
		<View style={styles.buttonRow}>
			<ButtonDefault title="Automatic" onPress={() => setIsManual(false)} inverted={isManual} svg={Automatic} />
			<ButtonDefault title="Manual" onPress={() => setIsManual(true)} inverted={!isManual} svg={Manual} />
      	</View>
      	<TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate(isManual ? 'Manual' : 'BotView')}>
        	<Text style={styles.buttonText}>Start Engine</Text>
      	</TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  header: {
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  svgLogo: {
	flex: 1,
	justifyContent: 'center',
    alignItems: 'center',
	marginTop: '3em'
  },
  svgScores: {
	flexDirection: 'row',
	justifyContent: 'flex-end',
    alignItems: 'center',
	marginHorizontal: '1em'
  },
  image: {
	marginVertical: '2em',
	marginLeft: '10%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  circleButton: {
    width: 150,
    height: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00C99C',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default HomePage;