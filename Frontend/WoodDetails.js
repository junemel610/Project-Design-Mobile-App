import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function WoodDetails({ route, navigation }) {
  const { woodNumber, defects, classification } = route.params;

  return (
    <View style={styles.container}>
      {/* Only the bottom left Back Button */}
      <TouchableOpacity style={styles.backButtonBottom} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Wood No. "{woodNumber}"</Text>
      <Text style={styles.label}>Total Defects Detected: {defects.length}</Text>
      <Text style={styles.label}>Grading Classification:</Text>
      <Text style={styles.classificationText}>{classification}</Text>
      
      <View style={styles.box} />
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
  },
  classificationText: {
    fontSize: 16,
    marginVertical: 5,
  },
  box: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 20,
  },
});