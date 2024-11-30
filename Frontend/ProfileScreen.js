import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/5.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.aboutUsContainer}>
        <Text style={styles.aboutTitle}>About Us</Text>
        <Text style={styles.aboutText}>
          Welcome to InspecturaX! We are a dedicated team working on innovative
          solutions for automated wood quality grading and sorting.
          {'\n\n'}
          Thank you for trusting us to help enhance your production process.
          Together, let's build a more sustainable and efficient future in wood
          manufacturing!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  aboutUsContainer: {
    padding: 20,
    marginTop: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutText: {
    textAlign: 'justify',
    fontSize: 16,
    color: '#333',
  },
});