import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function HomeContent({ localWoodData = [], navigation = useNavigation()}) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  // Calculate today's totals
  const todayString = new Date().toISOString().split('T')[0];
  const todayData = localWoodData.filter(wood =>
    wood && wood.date && wood.date.toISOString().split('T')[0] === todayString
  );
  const totalWoodSortedToday = todayData.reduce((total, wood) => total + wood.woodCount, 0);
  const totalDefectsDetectedToday = todayData.reduce((total, wood) => total + wood.defectNo, 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
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
          source={{ uri: 'https://www.youtube.com/embed/gvkqT_Uoahw' }}
          style={styles.video} 
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
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
    height: 200,
    backgroundColor: 'black', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
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