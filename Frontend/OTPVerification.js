import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const backendUrl = Constants.expoConfig.extra.BACKEND_URL;

export default function OTPVerification({ navigation, route }) {
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to hold each digit as string
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const handleOtpChangeAndVerify = async (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value; // Store as string
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      if (newOtp.every(digit => digit !== '')) {
        await handleVerify(newOtp.join(''));
      }
    }
  };

  const handleVerify = async (concatenatedOtp) => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/verify-code`, { email, code: concatenatedOtp });

      if (response.data.success) {
        navigation.navigate('NewPassword', { email });
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    try {
      const response = await axios.post(`${backendUrl}/send-code`, { email });
      if (response.data.success) {
        Alert.alert('Success', 'Verification code sent successfully. Please check your email.');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send verification code.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit verification code we just sent to your email.
      </Text>

      <View style={styles.otpInputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => inputRefs.current[index] = el}
            style={styles.otpInput}
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChangeAndVerify(index, value)}
            keyboardType="numeric"
            returnKeyType="next"
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && index > 0) {
                handleOtpChangeAndVerify(index, '');
                inputRefs.current[index - 1].focus();
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={() => handleVerify(otp.join(''))} disabled={loading}>
        <Text style={styles.verifyButtonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code? </Text>
        <TouchableOpacity onPress={handleSendCode}>
          <Text style={styles.resendButton}>Resend</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the input boxes
    marginBottom: 20,
    width: '100%',
  },
  otpInput: {
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5, // Increased margin for better spacing
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  verifyButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    color: '#666',
  },
  resendButton: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});