import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getTasks, saveTasks } from '../utils/storage';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium'); // Low, Medium, High
  const [date, setDate] = useState(() => {
    // Set initial date to next hour
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    return now;
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' or 'time'

  const router = useRouter();

  const addTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    // Check if due date is in the past
    if (date < new Date()) {
      Alert.alert(
        'Past Due Date',
        'The due date is in the past. Do you want to continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue', onPress: actuallyAddTask }
        ]
      );
    } else {
      await actuallyAddTask();
    }
  };

  const actuallyAddTask = async () => {
    const existing = await getTasks();

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      dueDate: date.toISOString(),
      createdAt: new Date().toISOString(),
    };

    await saveTasks([...existing, newTask]);
    router.back();
  };

  const handlePickerChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
    
    if (selectedDate) {
      if (pickerMode === 'date') {
        // Keep the time part, update date part
        const newDate = new Date(date);
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setDate(selectedDate.getDate());
        setDate(newDate);
      } else {
        // Keep the date part, update time part
        const newDate = new Date(date);
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
        newDate.setSeconds(0);
        setDate(newDate);
      }
    }
  };

  const showPicker = (mode) => {
    setPickerMode(mode);
    if (Platform.OS === 'ios') {
      setShowDatePicker(true);
    } else {
      if (mode === 'date') {
        setShowDatePicker(true);
      } else {
        setShowTimePicker(true);
      }
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Task</Text>

      {/* Task Title */}
      <Text style={styles.label}>Task Title *</Text>
      <TextInput
        placeholder="What needs to be done?"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />

      {/* Description */}
      <Text style={styles.label}>Description (Optional)</Text>
      <TextInput
        placeholder="Add details about this task..."
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        maxLength={500}
      />

      {/* Priority Selector */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        {['Low', 'Medium', 'High'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.priorityButton,
              priority === level && styles[`priority${level}Active`]
            ]}
            onPress={() => setPriority(level)}
          >
            <Text style={[
              styles.priorityText,
              priority === level && styles.priorityTextActive
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date & Time Selectors */}
      <Text style={styles.label}>Due Date & Time</Text>
      
      <TouchableOpacity 
        style={styles.selector} 
        onPress={() => showPicker('date')}
        activeOpacity={0.7}
      >
        <Text style={styles.selectorLabel}>📅 Date</Text>
        <Text style={styles.selectorText}>{formatDate(date)}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.selector} 
        onPress={() => showPicker('time')}
        activeOpacity={0.7}
      >
        <Text style={styles.selectorLabel}>⏰ Time</Text>
        <Text style={styles.selectorText}>{formatTime(date)}</Text>
      </TouchableOpacity>

      {/* Combined DateTimePicker for iOS */}
      {(showDatePicker && Platform.OS === 'ios') && (
        <View style={styles.iosPickerContainer}>
          <DateTimePicker
            value={date}
            mode="datetime"
            display="spinner"
            onChange={handlePickerChange}
            style={styles.iosPicker}
          />
          <View style={styles.iosPickerButtons}>
            <TouchableOpacity 
              style={styles.iosPickerButton} 
              onPress={() => {
                setShowDatePicker(false);
                setShowTimePicker(false);
              }}
            >
              <Text style={styles.iosPickerButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Android Date Picker */}
      {showDatePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handlePickerChange}
          minimumDate={new Date()}
        />
      )}

      {/* Android Time Picker */}
      {showTimePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={handlePickerChange}
          is24Hour={false}
        />
      )}

      {/* Add Task Button */}
      <TouchableOpacity 
        style={[
          styles.button, 
          !title.trim() && styles.buttonDisabled
        ]} 
        onPress={addTask}
        disabled={!title.trim()}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 30,
    color: '#1a1a1a'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  priorityLowActive: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
  },
  priorityMediumActive: {
    backgroundColor: '#fff8e1',
    borderColor: '#ff9800',
  },
  priorityHighActive: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  priorityTextActive: {
    color: '#333',
    fontWeight: '600',
  },
  selector: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  selectorLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  selectorText: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  iosPickerContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  iosPicker: {
    height: 200,
  },
  iosPickerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  iosPickerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iosPickerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: '#b0b0b0',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});