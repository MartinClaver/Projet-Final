import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

const ButtonDefault = ({ onPress, title, inverted, svg: SvgIcon }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: inverted ? '#FFFFFF' : '#00634D',
        },
        styles.button,
      ]}
    >
      {SvgIcon && (
        <View style={styles.svgContainer}>
          <SvgIcon />
        </View>
      )}
      <Text
        style={[
          {
            color: inverted ? '#00634D' : '#FFFFFF',
          },
          styles.text,
        ]}
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
	width: '10em'
  },
  text: {
	marginTop: 10,
    fontSize: 16,
	fontWeight: 'bold'
  },
});

export default ButtonDefault;