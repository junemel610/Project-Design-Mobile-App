// LoginScreen.js
import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, BackHandler, Alert} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backendUrl = `https://backend-v2px.onrender.com`;

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInAccount = async () => {
    try {
      if (!username || !password) {
        Alert.alert('Username and password are required');
        console.error('Username and password are required');
        return;
      }
  
      const response = await axios.post(`${backendUrl}/sign-in`, {
        username: username,  // Assuming the server expects 'username' instead of 'identifier'
        password: password,
      });
  
      console.log('Login Response:', response.data);
  
      if (response.data && response.data.success) {
        navigation.navigate('Home');
        console.log('Login successful');
        // Store the token in AsyncStorage
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);
        console.log('Token saved to AsyncStorage:', token);
        navigation.navigate('Home')
        
      } else {
        console.error('Error during login:', response.data.message);
  
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
  
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Prevent going back when the user is on the Sign In screen
      return true;
    });

    return () => backHandler.remove(); // Cleanup the event listener on component unmount
  }, []);

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.header}>Login here</Text>
      <Text style={styles.subHeader}>Welcome back, you've been missed!</Text>

      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#aaa" onChangeText={(text) => setUsername(text)}/>
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry onChangeText={(text) => setPassword(text)}/>

      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={() => navigation.navigate('PasswordReset')} 
      >
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={handleSignInAccount}
      >
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
    marginBottom: 15,
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#666',
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
