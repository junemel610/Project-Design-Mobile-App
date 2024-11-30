import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import OTPVerification from './OTPVerification';
import PasswordResetScreen from './PasswordResetScreen';
import NewPassword from './NewPassword'; 
import PasswordChangeSuccessScreen from './PasswordChangeSuccessScreen'; 
import AnalyticsDetails from './AnalyticsDetails';
import WoodDetails from './WoodDetails';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
        <Stack.Screen name="NewPassword" component={NewPassword} /> 
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="PasswordChangeSuccess" component={PasswordChangeSuccessScreen} />
        <Stack.Screen name="AnalyticsDetails" component={AnalyticsDetails} />
        <Stack.Screen name="WoodDetails" component={WoodDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
