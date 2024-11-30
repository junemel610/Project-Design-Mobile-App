import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ExploreScreen({ navigation }) {
  const [isOn, setIsOn] = useState(false);

  const handleButtonPress = () => {
    setIsOn((prev) => !prev);
    // Send logic to backend here (e.g., API call)
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.statusText}>Status: {isOn ? 'On' : 'Off'}</Text>
      <Button
        title={isOn ? 'Turn Off' : 'Turn On'}
        onPress={handleButtonPress}
        color="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});