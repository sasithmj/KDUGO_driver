import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {setDoc, doc, updateDoc, getDocs, collection} from 'firebase/firestore';
import {db} from '../../firebase';
import Timeline from '../components/Timeline';
import NextInterchange from '../components/NextInterchange';

const interchangesData = [
  {name: 'Kahathuduwa Interchange', distance: 5.9, passed: true},
  {name: 'Gelanigama Interchange', distance: 13.7, passed: true},
  {name: 'Dodangoda Interchange', distance: 34.8, passed: false},
  {name: 'Welipenna Interchange', distance: 46.0, passed: false},
  {name: 'Kurudugahahethekma Interchange', distance: 67.6, passed: false},
  {name: 'Baddegama Interchange', distance: 79.8, passed: false},
  {name: 'Pinnaduwa Interchange', distance: 95.3, passed: false},
  {name: 'Imaduwa Interchange', distance: 107.5, passed: false},
  {name: 'Kokmaduwa Interchange', distance: 115.2, passed: false},
  {name: 'Godagama Interchange', distance: 126.2, passed: false},
  {name: 'Godagama - Palatuwa Interchange', distance: 126.2, passed: false},
  {name: 'Kapuduwa Interchange', distance: 130, passed: false},
  {name: 'Aparekka Interchange', distance: 136, passed: false},
  {name: 'Beliatta Interchange', distance: 151, passed: false},
  {name: 'Bedigama Interchange', distance: 160, passed: false},
  {name: 'Kasagala Interchange', distance: 164, passed: false},
  {name: 'Angunukolapelessa Interchange', distance: 173, passed: false},
  {name: 'Barawakubuka Interchange', distance: 181, passed: false},
  {name: 'Sooriyawewa Interchange', distance: 191, passed: false},
];

export default function TrackingPage() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [interchangeList, setInterchangeList] = useState([]);
  const [watchId, setWatchId] = useState(null);
  const [isToCampus, setIsToCampus] = useState(true); // State for toggle button

  useEffect(() => {
    const fetchInterchanges = async () => {
      const querySnapshot = await getDocs(collection(db, 'interchanges'));
      const interchanges = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter and sort based on the toggle state
      const filteredAndSortedInterchanges = interchanges
        .filter(interchange => interchange.distance != null) // Excludes interchanges with null distances
        .sort((a, b) =>
          isToCampus ? b.distance - a.distance : a.distance - b.distance,
        ); // Sort based on toggle state

      setInterchangeList(filteredAndSortedInterchanges);
    };

    fetchInterchanges();
    startTracking();
    return () => {
      stopTracking();
    };
  }, [isToCampus]); // Add isToCampus as a dependency to re-fetch on toggle change

  const startTracking = () => {
    setIsTracking(true);
    const id = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        updateLocationInFirebase({latitude, longitude});
      },
      error => console.log('Error', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 30000,
        fastestInterval: 2000,
      },
    );
    setWatchId(id);
  };

  const stopTracking = () => {
    setIsTracking(false);
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
      updateDoc(doc(db, 'busLocation', 'currentLocation'), {
        isTracking: false,
      }).catch(error => console.error('Error updating location:', error));
    }
  };

  const updateLocationInFirebase = coords => {
    setDoc(doc(db, 'busLocation', 'currentLocation'), {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp: Date.now(),
      isTracking: true,
    }).catch(error => console.error('Error updating location:', error));
  };

  const updateInterchangeStatus = index => {
    const updatedList = [...interchangeList];
    updatedList[index].passed = true;
    setInterchangeList(updatedList);

    updateDoc(doc(db, 'interchanges', updatedList[index].name), {
      passed: true,
    }).catch(error => console.error('Error updating interchanges:', error));
  };

  const toggleInterchangeOrder = () => {
    setIsToCampus(prevState => !prevState); // Toggle the state
  };

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <View style={styles.toggleContainer}>
        <Button
          title={isToCampus ? 'Switch to From Campus' : 'Switch to To Campus'}
          onPress={toggleInterchangeOrder}
        />
      </View>

      {/* Current Location Display */}
      {/* {currentLocation && (
        <Text style={styles.locationText}>
          Current Location: {currentLocation.latitude.toFixed(4)},{' '}
          {currentLocation.longitude.toFixed(4)}
        </Text>
      )} */}

      <Timeline interchangeList={interchangeList} />
      <NextInterchange
        interchangeList={interchangeList}
        onMarkPassed={updateInterchangeStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  toggleContainer: {
    marginBottom: 20,
  },
  locationText: {
    marginVertical: 10,
    textAlign: 'center',
  },
});
