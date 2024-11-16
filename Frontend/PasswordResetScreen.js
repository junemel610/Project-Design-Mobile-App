// PasswordReset.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function PasswordResetScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = () => {
    // Implement logic to send a verification code to the entered phone number
    // After sending the code, navigate to the OTPVerification screen:
    navigation.navigate('OTPVerification', { phoneNumber });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password?</Text>
      <Text style={styles.subHeader}>
        Don't worry! It occurs. Please enter the mobile number linked with your account.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>

      <View style={styles.rememberContainer}>
        <TouchableOpacity onPress={() => { /* Add any logic for remember password */ }}>
          <Text style={styles.rememberText}>Remember Password?</Text>
        </TouchableOpacity>

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
