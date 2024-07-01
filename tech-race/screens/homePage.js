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
        	<Text style={styles.buttonText}>Grand Bouton</Text>
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
	marginVertical: 20
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