// PasswordReset.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const backendUrl = Constants.expoConfig.extra.BACKEND_URL;

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendCode = async () => {
    console.log('Sending verification code to:', email); 
    try {
      const response = await axios.post(`${backendUrl}/send-code`, { email });
      console.log('Response from server:', response.data); 

      if (response.data.success) {
        console.log('Verification code sent successfully');
        Alert.alert('Success', 'Verification code sent successfully. Please check your email.');
        console.log('Navigating to OTP verification...');
        navigation.navigate('OTPVerification', { email });
      } else {
        console.error('Error sending verification code:', response.data.message);
        Alert.alert('Error', response.data.message || 'Failed to send verification code.');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password?</Text>
      <Text style={styles.subHeader}>
        Don't worry! It occurs. Please enter the email address linked with your account.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>

      <View style={styles.rememberContainer}>
        <Text style={styles.rememberText}>Remember Password?</Text>
    
        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => navigation.navigate('Login')} // Navigate to Login screen
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rememberContainer: {
    flexDirection: 'row', // Aligns child elements in a row (horizontally)
    justifyContent: 'center', // Centers the content horizontally
    marginTop: 15,
  },
  rememberText: {
    color: '#666',
    fontSize: 14,
  },
  loginContainer: {
    marginLeft: 10, // Adds some space between the Remember Password? and Login
  },
  loginText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
