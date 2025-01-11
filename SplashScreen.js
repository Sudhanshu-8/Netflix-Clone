import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const letterAnimation = useRef(new Animated.Value(0)).current; // For sliding "Q"
  const restTextOpacity = useRef(new Animated.Value(0)).current; // For fading in "uadB Tech"

  useEffect(() => {
    // Start animations in sequence
    Animated.sequence([
      // Slide the "Q"
      Animated.timing(letterAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Fade in the "uadB Tech"
      Animated.timing(restTextOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Wait for 1 second before navigating
      setTimeout(() => {
        navigation.replace('Main'); // Navigate to the main screen
      }, 1000);
    });
  }, [navigation, letterAnimation, restTextOpacity]);

  const translateX = letterAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5], // Reduce the movement to keep "Q" closer to "uadB Tech"
  });

  return (
    <View style={styles.container}>
      <Animated.View style={styles.textWrapper}>
        <Animated.Text style={[styles.logoText, { transform: [{ translateX }] }]}>
          Q
        </Animated.Text>
        <Animated.Text style={[styles.logoText, { opacity: restTextOpacity }]}>
          uadB Tech
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Netflix black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row', // Align "Q" and "uadB Tech" horizontally
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E50914', // Netflix red color
    letterSpacing: 1,
  },
});

export default SplashScreen;
