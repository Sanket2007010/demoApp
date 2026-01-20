import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getTasks, saveTasks } from '../utils/storage';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    const all = await getTasks();
    const task = all.find((t) => t.id === id);

    if (task) {
      setTitle(task.title);
      setCompleted(task.completed);
      if (task.dueDate) setDate(new Date(task.dueDate));
    }
  };

  const updateTask = async () => {
    const all = await getTasks();

    const updated = all.map((t) =>
      t.id === id
        ? { ...t, title, completed, dueDate: date.toISOString() }
        : t
    );

    await saveTasks(updated);
    router.back();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>

      <TextInput
        placeholder="Task title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      {/* DATE */}
      <TouchableOpacity style={styles.selector} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.selectorText}>
          Due Date: {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {/* TIME */}
      <TouchableOpacity style={styles.selector} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.selectorText}>
          Due Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      {/* COMPLETED SWITCH */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Completed</Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>

      <TouchableOpacity style={styles.button} onPress={updateTask}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  selector: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },

  selectorText: {
    color: '#333',
    fontSize: 14,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },

  button: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
