import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, TouchableOpacity, SafeAreaView, Modal } from 'react-native';


// TaskItem Component
const TaskItem = ({ text }) => (
  <View style={styles.taskItem}>
    <Text style={styles.taskText}>{text}</Text>
  </View>
);

const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const addTaskHandler = () => {
    if (taskInput.trim()) {
      setTasks((currentTasks) => [
        ...currentTasks,
        { text: taskInput, key: Math.random().toString() },
      ]);
      setTaskInput('');
    }
  };

  const clearTasksHandler = () => {
    setTasks([]);
  };

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Tasks Screen</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your Task"
          style={styles.textInput}
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTaskHandler}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem text={item.text} />}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Clear All"
          onPress={clearTasksHandler}
          color="black" // Bootstrap danger color
        />
      </View>

      <Button title="Welcome" onPress={toggleModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Welcome to the Tasks Screen!</Text>
            <Button title="Exit" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#000000', // Keep this as is for the input field
    padding: 10,
    width: '78%',
    borderRadius: 5,
    backgroundColor: '#f4f4f4',
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    borderWidth: 2, // Keep border width
    borderColor: '#333333', // Change this to a darker shade for task items
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    marginVertical: 20,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});

export default TasksScreen;