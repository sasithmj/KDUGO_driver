import React, {useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

export default function StartButton({onPress}) {
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current; // Opacity for blinking effect

  useEffect(() => {
    // Start blinking as soon as the component mounts
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonOpacity, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {iterations: -1}, // Infinite loop
    ).start();
  }, []);

  const animateButton = () => {
    Animated.timing(buttonScale, {
      toValue: 1.2,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });

    onPress();
  };

  return (
    <TouchableOpacity onPress={animateButton}>
      <Animated.View
        style={[
          styles.button,
          {transform: [{scale: buttonScale}], opacity: buttonOpacity},
        ]}>
        <Text style={styles.buttonText}>Start Tracking</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
