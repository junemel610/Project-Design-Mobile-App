import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AnalyticsDetails({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '2024-11-29', value: '2024-11-29' },
    { label: '2024-11-28', value: '2024-11-28' },
    { label: '2024-11-27', value: '2024-11-27' },
  ]);

  const woodDetails = {
    woodNumber: '123',
    defects: ['Defect 1', 'Defect 2', 'Defect 3'],
    classification: 'High Quality',
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select a Date"
          style={styles.dropdown}
        />
        
        {/* Combined Container for Wood Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Wood Number: {woodDetails.woodNumber}</Text>
          <Text style={styles.detailsText}>Total Defects Detected: {woodDetails.defects.length}</Text>
          <Text style={styles.detailsText}>Grading Classification: {woodDetails.classification}</Text>
          
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('WoodDetails', woodDetails)}
          >
            <Text style={styles.detailsButtonText}>Tap to View More Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Left Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Two Additional Blank Containers */}
      <View style={styles.blankContainer} />
      <View style={styles.blankContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '90%',
  },
  dropdown: {
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 15,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 3,
    color: '#555',
  },
  detailsButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#000',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    padding: 10,
  },
  blankContainer: {
    width: '90%',
    height: 100, 
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});