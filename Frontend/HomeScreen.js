import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from './ExploreScreen';
import AnalyticsScreen from './AnalyticsScreen';
import TasksScreen from './TaskScreen';
import ProfileScreen from './ProfileScreen';
import HomeContent from './HomeContent'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.navbar,
        tabBarLabelStyle: styles.navText,
        tabBarIconStyle: { marginBottom: -5 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeContent}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Control',
          tabBarIcon: ({ color, size }) => (
            <Icon name="explore" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="pie-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="assignment" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navText: {
    fontSize: 12,
    color: '#000',
  },
});
