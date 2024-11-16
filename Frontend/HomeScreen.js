import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Placeholder screens
function ExploreScreen() {
  const [isOn, setIsOn] = useState(false); // Button toggles between On/Off

  // Function to handle button press
  const handleButtonPress = () => {
    setIsOn((prev) => !prev); // Toggle On/Off state
    // Send logic to backend here (e.g., API call)
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.statusText}>Status: {isOn ? 'On' : 'Off'}</Text>

      {/* Button to toggle On/Off with black color */}
      <Button
        title={isOn ? 'Turn Off' : 'Turn On'}
        onPress={handleButtonPress}
        color="black" // Set the button color to black
      />
    </View>
  );
}

function AnalyticsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Analytics Screen</Text>
    </View>
  );
}

function TasksScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tasks Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      {/* Logo Section - Placed Above About Us */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/5.png')} // Replace with your logo file path
          style={styles.logo}
        />
      </View>

      {/* About Us Section */}
      <View style={styles.aboutUsContainer}>
        <Text style={styles.aboutTitle}>About Us</Text>
        <Text style={styles.aboutText}>
          Welcome to InspecturaX! We are a dedicated team working on innovative solutions for automated wood quality grading and sorting. 

          Our mission is to bring efficiency and accuracy to the wood manufacturing industry through cutting-edge computer vision and machine learning technology.

          Our mobile app is an integral part of the "Design of Vision-based Wood Quality Grading for Automated Wood Sorting Device" project. This solution aims to streamline wood quality inspection, reduce costs, and improve productivity for wood manufacturers. With our app, users can easily access quality grading results, monitor sorting accuracy, and gain valuable insights into wood quality control.

          Thank you for trusting us to help enhance your production process. Together, let's build a more sustainable and efficient future in wood manufacturing!
        </Text>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.navbar,
        tabBarLabelStyle: styles.navText,
        tabBarIconStyle: { marginBottom: -5 }, // Adjust icon spacing
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
          tabBarLabel: 'Control', // Change the tab bar label to "Control"
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

// Content for the "Home" tab
function HomeContent() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>InspecturaX</Text>
        <Icon name="settings" size={24} color="#000" style={styles.settingsIcon} />
      </View>
      <View style={styles.screen}>
        <Text style={styles.title}>Welcome to the Home Screen!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  settingsIcon: {
    padding: 5,
  },
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    textAlign: 'justify', // Justified text alignment
    fontSize: 16,
    color: '#333',
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
  statusText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});

