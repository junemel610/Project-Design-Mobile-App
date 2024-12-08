import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from './ExploreScreen';
import AnalyticsDetails from './AnalyticsDetails';
import TasksScreen from './TaskScreen';
import ProfileScreen from './ProfileScreen';
import HomeContent from './HomeContent'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const backendUrl = Constants.expoConfig.extra.BACKEND_URL;

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const [localWoodData, setLocalWoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/wood-data`);
        console.log('API Response:', response.data);

        // Check if the response contains woodData and it's an array
        if (response.data.success && Array.isArray(response.data.woodData)) {
          // Transform the data into the desired structure
          const transformedData = response.data.woodData.map(item => ({
            woodCount: item.woodCount,
            defects: item.defects.map(defect => ({
              defectType: defect.defectType,
              count: defect.count
            })),
            woodClassification: item.woodClassification,
            date: new Date(item.date), // Convert to Date object
            time: item.time
          }));

          setLocalWoodData(transformedData);
        } else {
          console.error('Expected an array but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching wood data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
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
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      >
        {() => <HomeContent localWoodData={localWoodData} />}
      </Tab.Screen>
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
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ color, size }) => (
            <Icon name="pie-chart" size={size} color={color} />
          ),
        }}
      >
        {() => <AnalyticsDetails localWoodData={localWoodData} />}
      </Tab.Screen>
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