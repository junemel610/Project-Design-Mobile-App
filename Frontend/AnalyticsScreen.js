import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const backendUrl = Constants.expoConfig.extra.BACKEND_URL;

export default function AnalyticsScreen({ navigation }) {
  const [woodData, setWoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWoodData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/wood-data`); 
        setWoodData(response.data.woodData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWoodData();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.screen}>
      {woodData.map((wood, index) => (
        <View key={index} style={styles.analyticsContainer}>
          <Text style={styles.analyticsTitle}>Wood No.: {wood.woodNumber}</Text>
          <Text style={styles.analyticsText}>Total Defects Detected: {wood.defectNo}</Text>
          <TouchableOpacity
            style={styles.analyticsButton}
            onPress={() => navigation.navigate('AnalyticsDetails', { wood })}
          >
            <Text style={styles.analyticsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
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