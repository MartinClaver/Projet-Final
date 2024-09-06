import React, { useState } from 'react';
import { View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

export default function CustomPressable({
  children,
  onBegin,
  onEnd,
  onFinalize,
  maxDuration = 100000,
}) {
  const [isPressed, setPressed] = useState(false);
  const tapGesture = Gesture.Tap()
    .maxDuration(maxDuration)
    .onBegin(() => {
      setPressed(true);
      onBegin();
    })
    .onEnd(() => {
      setPressed(false);
      onEnd();
    })
    .onFinalize(() => {
      onFinalize(); 
    })

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={isPressed && { opacity: 0.6 }}>
        {children}
      </View>
    </GestureDetector>
  );
}