import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function AnalyticsDetails({ localWoodData = [], navigation = useNavigation()}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'this_week' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Custom Date', value: 'custom_date' },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [customDateString, setCustomDateString] = useState('');

  const handleSelection = (selectedValue) => {
    switch (selectedValue) {
      case 'today':
        const todayData = localWoodData.filter(data =>
          data && data.date && data.date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
        );
        setFilteredData(todayData);
        setCustomDateString('');
        break;
      case 'this_week':
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday
        const endOfWeek = new Date();
        endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // Saturday
        const weekData = localWoodData.filter(data => {
          return data.date >= startOfWeek && data.date <= endOfWeek;
        });
        setFilteredData(weekData);
        setCustomDateString('');
        break;
      case 'this_month':
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        const monthData = localWoodData.filter(data => {
          return data.date >= startOfMonth && data.date <= endOfMonth;
        });
        setFilteredData(monthData);
        setCustomDateString('');
        break;
      case 'custom_date':
        setShowDatePicker(true);
        break;
      default:
        setFilteredData(localWoodData);
        setCustomDateString('');
        break;
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setSelectedDate(currentDate);

    const formattedDate = currentDate.toLocaleDateString();

    // Filtering based on the selected date
    const filteredData = localWoodData.filter(data => {
      return data.date.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0];
    });
    setFilteredData(filteredData);
    setCustomDateString(formattedDate);
  };

  // Calculate totals
  const woodSortedTotal = filteredData.reduce((total, wood) => total + wood.woodCount, 0);
  const defectNoTotal = filteredData.reduce((total, wood) => total + wood.defectNo, 0);

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
          onChangeValue={(value) => {
            handleSelection(value);
          }}
        />

        {customDateString ? (
          <Text style={styles.customDateText}>Selected Date: {customDateString}</Text>
        ) : null}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {filteredData.length > 0 ? (
          filteredData.map((wood, index) => (
            <View key={index} style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>Wood Count: {wood.woodCount}</Text>
              <Text style={styles.detailsText}>Total Defects Detected: {wood.defectNo}</Text>
              <Text style={styles.detailsText}>Date: {wood.date.toLocaleDateString()}</Text>
              <Text style={styles.detailsText}>Time: {wood.time}</Text>
              
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('WoodDetails', {
                  woodCount: wood.woodCount,
                  defectNo: wood.defectNo,
                  woodClassification: wood.woodClassification,
                  defectType: Array.isArray(wood.defectType) ? wood.defectType : [], 
                  date: wood.date.toLocaleDateString(),
                  time: wood.time,
                })}
              >
                <Text style={styles.detailsButtonText}>Tap to View More Details</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No data available for the selected period.</Text>
        )}

        {/* Display Totals */}
        {filteredData.length > 0 && (
          <View style={styles.totalsContainer}>
            <Text style={styles.totalsText}>Total Wood Sorted: {woodSortedTotal}</Text>
            <Text style={styles.totalsText}>Total Defects Detected: {defectNoTotal}</Text>
          </View>
        )}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '90%',
  },
  dropdown: {
    marginBottom: 20,
  },
  customDateText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
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
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  totalsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});