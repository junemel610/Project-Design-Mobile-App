import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from './ExploreScreen';
import AnalyticsDetails from './AnalyticsDetails';
import TasksScreen from './TaskScreen';
import ProfileScreen from './ProfileScreen';
import HomeContent from './HomeContent'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const backendUrl = `https://backend-v2px.onrender.com`;

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const [localWoodData, setLocalWoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/wood-data`);
        console.log('API Response:', response.data);

        if (response.data.success && Array.isArray(response.data.woodData)) {
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
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 70, // Increased height
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ddd',
            elevation: 5, // Shadow for Android
            shadowColor: '#000', // Shadow for iOS
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarLabelStyle: {
            fontSize: 10, // Font size
            marginBottom: 5, // Margin for bottom
            textAlign: 'center', // Center text
          },
          tabBarIconStyle: {
            marginBottom: 4, // Icon margin
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={26} color={color} /> // Increased icon size
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
            tabBarIcon: ({ color }) => (
              <Icon name="explore" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Analytics"
          options={{
            tabBarLabel: 'Analytics',
            tabBarIcon: ({ color }) => (
              <Icon name="pie-chart" size={26} color={color} />
            ),
          }}
        >
          {() => <AnalyticsDetails localWoodData={localWoodData} />}
        </Tab.Screen>
        <Tab.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="assignment" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="person" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navText: {
    fontSize: 10,
    color: '#000',
  },
});