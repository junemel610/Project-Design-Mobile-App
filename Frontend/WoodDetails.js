import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function WoodDetails({ route, navigation }) {
  const { woodCount, defectNo, woodClassification, defects } = route.params;

  // Extract defect types from the defects array
  const defectTypes = defects.map(defect => ({
    type: defect.defectType,
    count: defect.count,
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonBottom} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Wood Details</Text>
      <Text style={styles.label}>Wood Count: {woodCount}</Text>
      <Text style={styles.label}>Total Defects Detected: {defectNo}</Text>
      <Text style={styles.label}>Grading Classification: {woodClassification}</Text>

      <Text style={styles.label}>Defect Types:</Text>
      {defectTypes.length > 0 ? (
        <FlatList
          data={defectTypes}
          keyExtractor={(item) => item.type}
          renderItem={({ item }) => (
            <Text style={styles.defectText}>
              {item.type} (Count: {item.count})
            </Text>
          )}
        />
      ) : (
        <Text style={styles.label}>None</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Changed to flex-start to keep items at the top
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40, // Added padding to the top for better spacing
    paddingHorizontal: 15, // Added horizontal padding for better side spacing
  },
  backButtonBottom: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  defectText: {
    fontSize: 16,
    marginVertical: 2,
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
});