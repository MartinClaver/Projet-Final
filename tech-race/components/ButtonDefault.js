import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

const ButtonDefault = ({ onPress, title, inverted, svg: SvgIcon }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[ styles.button, inverted ? styles.inverted : styles.default ]}
    >
      {SvgIcon && (
        <View style={styles.svgContainer}>
          <SvgIcon />
        </View>
      )}
      <Text
        style={[ styles.text, inverted ? styles.textInverted : styles.textDefault ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 10,
		flexDirection: 'column',
		width: '10em',
	},
	default: {
		backgroundColor: '#00634D'
	},
	inverted: {
		backgroundColor: '#FFFFFF'
	},
	text: {
		marginTop: 10,
		fontSize: 16,
		fontWeight: 'bold',
	},
	textDefault: {
		color: '#FFFFFF'
	},
	textInverted: {
		color: '#00634D'
	},
});

export default ButtonDefault;