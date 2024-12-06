import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function WoodDetails({ route, navigation }) {
  // Destructure the passed parameters from the route
  const { woodCount, defectNo, woodClassification, defectType } = route.params;

  return (
    <View style={styles.container}>
      {/* Only the bottom left Back Button */}
      <TouchableOpacity style={styles.backButtonBottom} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Wood Details</Text>
      <Text style={styles.label}>Wood Count: {woodCount}</Text>
      <Text style={styles.label}>Total Defects Detected: {defectNo}</Text>
      <Text style={styles.label}>Grading Classification: {woodClassification}</Text>
      <Text style={styles.label}>
        Defect Types: {Array.isArray(defectType) && defectType.length > 0 ? defectType.join(', ') : 'None'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  backButtonBottom: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
});