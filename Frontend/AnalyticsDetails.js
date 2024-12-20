import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function AnalyticsDetails({ localWoodData = [] }) {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'this_week' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Custom Date', value: 'custom_date' },
    { label: 'All Wood Details', value: 'all_wood' }, // New option
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [customDateString, setCustomDateString] = useState('');

  const handleSelection = (selectedValue) => {
    const today = new Date();
    const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
    let newFilteredData = [];

    switch (selectedValue) {
      case 'today':
        newFilteredData = localWoodData.filter(data =>
          data.date && new Date(data.date).setHours(0, 0, 0, 0) === todayMidnight.getTime()
        );
        break;
      case 'this_week':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);
        newFilteredData = localWoodData.filter(data => 
          new Date(data.date) >= startOfWeek && new Date(data.date) <= endOfWeek
        );
        break;
      case 'this_month':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);
        newFilteredData = localWoodData.filter(data => 
          new Date(data.date) >= startOfMonth && new Date(data.date) <= endOfMonth
        );
        break;
      case 'custom_date':
        setShowDatePicker(true);
        return;
      case 'all_wood': // Handle the new case
        newFilteredData = localWoodData; // Show all wood data
        break;
      default:
        newFilteredData = localWoodData;
        break;
    }

    setFilteredData(newFilteredData);
    setCustomDateString('');
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || new Date();

    const selectedDateMidnight = new Date(currentDate.setHours(0, 0, 0, 0));
    const formattedDate = selectedDateMidnight.toLocaleDateString();

    const filteredData = localWoodData.filter(data => {
      const dataDateMidnight = new Date(data.date);
      dataDateMidnight.setHours(0, 0, 0, 0);
      return dataDateMidnight.toISOString().split('T')[0] === selectedDateMidnight.toISOString().split('T')[0];
    });
    
    setFilteredData(filteredData);
    setCustomDateString(formattedDate);
  };

  // Calculate totals
  const totalWoodSorted = filteredData.length;  
  const defectNoTotal = filteredData.reduce((total, wood) => total + (wood.defects.reduce((dTotal, defect) => dTotal + (defect.count || 0), 0) || 0), 0);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select a Time Period"
          style={styles.dropdown}
          onChangeValue={handleSelection}
        />

        {customDateString && (
          <Text style={styles.customDateText}>Selected Date: {customDateString}</Text>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Totals Container placed above the ScrollView */}
        {filteredData.length > 0 && (
          <View style={styles.totalsContainer}>
            <Text style={styles.totalsText}>Total Wood Sorted: {totalWoodSorted}</Text>
            <Text style={styles.totalsText}>Total Defects Detected: {defectNoTotal}</Text>
          </View>
        )}

        <ScrollView style={styles.scrollView}>
          {filteredData.length > 0 ? (
            filteredData.map((wood, index) => (
              <View key={index} style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Wood Count: {wood.woodCount}</Text>
                <Text style={styles.detailsText}>Total Defects Detected: {wood.defects.reduce((total, defect) => total + defect.count, 0)}</Text>
                {wood.defects.map((defect, idx) => (
                  <Text key={idx} style={styles.defectText}>
                    {defect.defectType}: {defect.count}
                  </Text>
                ))}
                <Text style={styles.detailsText}>Date: {new Date(wood.date).toLocaleDateString()}</Text>
                <Text style={styles.detailsText}>Time: {wood.time}</Text>
                
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => navigation.navigate('WoodDetails', {
                    woodCount: wood.woodCount,
                    defectNo: wood.defects.reduce((total, defect) => total + defect.count, 0),
                    woodClassification: wood.woodClassification,
                    defects: wood.defects,
                    date: new Date(wood.date).toLocaleDateString(),
                    time: wood.time,
                  })}
                >
                  <Text style={styles.detailsButtonText}>Tap to View More Details</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No data available for the selected period. Please try a different date range.</Text>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start', // Changed to prevent centering
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  container: {
    width: '90%',
    flex: 1,
  },
  dropdown: {
    marginTop: 50,
  },
  customDateText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  scrollView: {
    marginTop: 10,
    maxHeight: '70%', // Adjusted for better space management
  },
  detailsContainer: {
    padding: 15,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 3,
    color: '#555',
  },
  detailsButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#000',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    padding: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  totalsContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 10, // Added margin to separate from the dropdown
  },
  totalsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});