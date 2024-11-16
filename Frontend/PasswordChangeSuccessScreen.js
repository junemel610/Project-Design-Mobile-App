import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using Expo

const PasswordChangeSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {/* Change the icon color to black */}
        <FontAwesome5 name="check-circle" size={60} color="black" />
      </View>

      <Text style={styles.title}>Password Changed!</Text>
      <Text style={styles.message}>Your password has been changed successfully.</Text>

      {/* Update button style to black */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Adjusted title color to ensure visibility
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666', // Slightly gray color for the message
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',  // Set button background to black
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',  // White text on the black button for visibility
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PasswordChangeSuccessScreen;
