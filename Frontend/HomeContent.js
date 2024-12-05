import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview'; // Import WebView

export default function HomeContent() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>InspecturaX</Text>
        <Icon name="settings" size={24} color="#000" style={styles.settingsIcon} />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
      </View>
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/gvkqT_Uoahw' }} // Use embed URL
          style={styles.video} // Apply the styles to the WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Live Streaming</Text>
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
    padding: 5,
  },
});