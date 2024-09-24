import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {db} from '../../firebase';
import {doc, updateDoc} from 'firebase/firestore';

export default function NextInterchange({interchangeList, onMarkPassed}) {
  const navigation = useNavigation();

  const getNextInterchange = () => {
    return interchangeList.find(interchange => !interchange.passed);
  };

  const resetInterchanges = async () => {
    const updates = interchangeList.map(interchange =>
      updateDoc(doc(db, 'interchanges', interchange.name), {
        passed: false,
      }),
    );

    try {
      await Promise.all(updates);
      navigation.navigate('Home'); // Assuming 'Home' is the name of your home screen in your navigator
    } catch (error) {
      console.error('Error resetting interchanges:', error);
      Alert.alert('Error', 'Failed to reset interchanges');
    }
  };

  const nextInterchange = getNextInterchange();

  if (!nextInterchange) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>All interchanges have been passed.</Text>
        <TouchableOpacity style={styles.button} onPress={resetInterchanges}>
          <Text style={styles.buttonText}>Reset Interchanges</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const index = interchangeList.indexOf(nextInterchange);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Next to mark: {nextInterchange.name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onMarkPassed(index)}>
        <Text style={styles.buttonText}>Mark as Passed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
