import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import StartButton from '../components/StartButton';

const backgroundImage = {
  uri: 'https://images.unsplash.com/photo-1561579680-7ee92bef4298?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVzfGVufDB8fDB8fHww',
};

export default function HomePage({navigation}) {
  const handleStartTracking = () => {
    navigation.navigate('Tracking');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      {/* <Text style={styles.title}>Welcome to Bus Driver Tracking App</Text> */}
      <StartButton onPress={handleStartTracking} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
