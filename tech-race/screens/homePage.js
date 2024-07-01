import React from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import LogoApp from '../assets/LogoApp.svg';
import Scores from '../assets/Scores.svg';
import Automatic from '../assets/Automatic.svg';
import Manual from '../assets/Manual.svg';
import ButtonDefault from '../components/ButtonDefault';

const HomePage = () => {
  return (
    <View style={styles.container}>
    	<View style={styles.row}>
        	<View style={styles.svgLogo}>
        		<LogoApp style={styles.logo} />
        	</View>
			<View style={styles.svgScores}>
				<Scores style={styles.scores} />
			</View>
      	</View>
		<Image
			source={require('../assets/Car.png')}
			style={styles.image}
			resizeMode="contain"
		/>
		<View style={styles.buttonRow}>
			<ButtonDefault title="Automatic" onPress={() => {}} svg={Automatic} />
			<ButtonDefault title="Manual" onPress={() => {}} inverted='true' svg={Manual} />
      	</View>
      	<TouchableOpacity style={styles.circleButton}>
        	<Text style={styles.buttonText}>Start Engine</Text>
      	</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  row: {
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
    width: '10em',
    height: '10em',
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
	borderWidth: '0.3em',
	borderColor: '#00C99C',
	marginTop: '1.5em'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default HomePage;