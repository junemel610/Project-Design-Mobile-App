import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function HomeContent({ localWoodData = [] }) {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [url, setUrl] = useState(''); 
  const [webViewUrl, setWebViewUrl] = useState(''); 
  const [token, setToken] = useState(null); // State to hold the token

  const todayString = new Date().toISOString().split('T')[0];

  const todayData = localWoodData.filter(wood => {
    const woodDate = new Date(wood.date);
    woodDate.setHours(0, 0, 0, 0);
    return wood && wood.date && woodDate.toISOString().split('T')[0] === todayString;
  });

  const totalWoodSortedToday = todayData.length;
  const totalDefectsDetectedToday = todayData.reduce((total, wood) => {
    return total + (wood.defects ? wood.defects.reduce((sum, defect) => sum + defect.count, 0) : 0);
  }, 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Load token from AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken); // Set the token state
        console.log('Loaded token from AsyncStorage:', storedToken);
      } catch (error) {
        console.error('Error loading token:', error);
      }
    };

    fetchToken();
  }, []);

  // Function to handle URL submission
  const handleUrlSubmit = () => {
    if (url.trim()) {
      setWebViewUrl(url);
    } else {
      console.warn("Please enter a valid URL.");
    }
  };

  // Logout function
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout canceled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const storedToken = await AsyncStorage.getItem('token');
              console.log("Clearing AsyncStorage token: ", storedToken); // Log the actual token
              
              // Clear AsyncStorage
              await AsyncStorage.clear();
              console.log("Logged out and AsyncStorage cleared");
              navigation.navigate('Login'); // Navigate to the login screen
            } catch (error) {
              console.error('Error during logout:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>InspecturaX</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={24} color="#000" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.analyticsContainer}>
        <Text style={styles.analyticsTitle}>{currentTime}</Text>
        <Text style={styles.analyticsText}>Total Wood Sorted for Today: {totalWoodSortedToday}</Text>
        <Text style={styles.analyticsText}>Total Defects Detected for Today: {totalDefectsDetectedToday}</Text>
        <TouchableOpacity
          style={styles.analyticsButton}
          onPress={() => {
            console.log("Navigating to Analytics");
            navigation.navigate('Analytics');
          }}
        >
          <Text style={styles.analyticsButtonText}>Tap to View More Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Live Streaming</Text>
      </View>

      <View style={styles.urlContainer}>
        <TextInput
          style={styles.urlInput}
          placeholder="Enter URL"
          value={url}
          onChangeText={setUrl}
          onSubmitEditing={handleUrlSubmit} 
          returnKeyType="go" 
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleUrlSubmit}>
          <Text style={styles.submitButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: webViewUrl }} 
          style={styles.video}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('HTTP Error: ', nativeEvent);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView Error: ', nativeEvent);
          }}
          onLoadStart={() => console.log('Loading started...')}
          onLoadEnd={() => console.log('Loading finished!')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  logoutIcon: {
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
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  urlInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1, // Allow input to take remaining space
    marginRight: 10, // Space between input and button
  },
  submitButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Button color
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});