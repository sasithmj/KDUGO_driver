import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

function TimelineItem({item, index, isLast, isNext}) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineLeft}>
        <View
          style={[
            styles.timelineCircle,
            item.passed && styles.timelineCirclePassed,
            isNext && styles.timelineCircleCurrent,
          ]}
        />
        {!isLast && (
          <View
            style={[
              styles.timelineConnector,
              item.passed && styles.timelineConnectorPassed,
            ]}
          />
        )}
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.interchangeName}>{item.name}</Text>
        <Text style={styles.interchangeDistance}>{item.distance} km</Text>
      </View>
    </View>
  );
}

export default function Timeline({interchangeList}) {
  const getNextInterchangeIndex = () => {
    return interchangeList.findIndex(interchange => !interchange.passed);
  };

  return (
    <FlatList
      data={interchangeList}
      renderItem={({item, index}) => (
        <TimelineItem
          item={item}
          index={index}
          isLast={index === interchangeList.length - 1}
          isNext={index === getNextInterchangeIndex()}
        />
      )}
      keyExtractor={item => item.name}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 10,
  },
  timelineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    borderWidth: 2,
    borderColor: '#fff',
  },
  timelineCirclePassed: {
    backgroundColor: '#4CAF50',
  },
  timelineCircleCurrent: {
    backgroundColor: '#2196F3',
  },
  timelineConnector: {
    width: 2,
    height: 30,
    backgroundColor: '#ccc',
  },
  timelineConnectorPassed: {
    backgroundColor: '#4CAF50',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 20,
  },
  interchangeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  interchangeDistance: {
    fontSize: 14,
    color: '#666',
  },
});
