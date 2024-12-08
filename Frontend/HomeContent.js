import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function HomeContent({ localWoodData = [] }) {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const todayString = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  // Normalize today's date to midnight
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  const todayData = localWoodData.filter(wood => {
    const woodDate = new Date(wood.date);
    // Normalize woodDate to midnight for comparison
    woodDate.setHours(0, 0, 0, 0);
    return wood && wood.date && woodDate.toISOString().split('T')[0] === todayString;
  });

  // Calculate totals
  const totalWoodSortedToday = todayData.length; // Use the length of todayData instead of summing woodCount
  const totalDefectsDetectedToday = todayData.reduce((total, wood) => {
    return total + (wood.defects ? wood.defects.reduce((sum, defect) => sum + defect.count, 0) : 0);
  }, 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>InspecturaX</Text>
        <Icon name="settings" size={24} color="#000" style={styles.settingsIcon} />
      </View>

      <View style={styles.analyticsContainer}>
        <Text style={styles.analyticsTitle}>{currentTime}</Text>
        <Text style={styles.analyticsText}>Total Wood Sorted for Today: {totalWoodSortedToday}</Text>
        <Text style={styles.analyticsText}>Total Defects Detected for Today: {totalDefectsDetectedToday}</Text>
        <TouchableOpacity
          style={styles.analyticsButton}
          onPress={() => {
            console.log("Navigating to Analytics");
            navigation.navigate('Analytics'); // This should work if navigation is passed correctly
          }}
        >
          <Text style={styles.analyticsButtonText}>Tap to View More Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Live Streaming</Text>
      </View>
      
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: 'https://4cbb-136-158-48-242.ngrok-free.app' }} // Replace with your ngrok URL
          style={styles.video}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true} // Show loading indicator
          scalesPageToFit={true} // Adjusts the webpage to fit
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('HTTP Error: ', nativeEvent);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView Error: ', nativeEvent);
          }}
          onLoadStart={() => console.log('Loading started...')} // Log when loading starts
          onLoadEnd={() => console.log('Loading finished!')} // Log when loading ends
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow the ScrollView to grow
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  welcomeContainer: {
    marginBottom: 20, 
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  videoContainer: {
    width: '100%',
    height: 225, 
  },
  settingsIcon: {
    marginTop: 20,
    padding: 5,
  },
  analyticsContainer: {
    width: '100%', 
    maxWidth: 400, 
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
    alignSelf: 'center', 
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
});