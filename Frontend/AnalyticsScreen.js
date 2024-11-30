import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AnalyticsScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <View style={styles.analyticsContainer}>
        <Text style={styles.analyticsTitle}>Date: 2024-11-29</Text>
        <Text style={styles.analyticsText}>Time: 12:00 PM</Text>
        <Text style={styles.analyticsText}>Total Wood Sorted: 150</Text>
        <Text style={styles.analyticsText}>Total Defects Detected: 25</Text>

        <TouchableOpacity
          style={styles.analyticsButton}
          onPress={() => navigation.navigate('AnalyticsDetails')}
        >
          <Text style={styles.analyticsButtonText}>Tap to View More Details</Text>
        </TouchableOpacity>
      </View>

      {/* New Blank Container */}
      <View style={styles.blankContainer}>
        {/* Optional: You can add text here if needed */}
        <Text style={styles.blankContainerText}>More Information Here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyticsContainer: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  analyticsText: {
    fontSize: 16,
    marginBottom: 3,
    color: '#555',
  },
  analyticsButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  analyticsButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blankContainer: {
    width: '90%',
    height: 100, // Adjust the height as needed
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff', // Optional: set a background color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  blankContainerText: {
    fontSize: 16,
    color: '#555', // Optional: text color
  },
});