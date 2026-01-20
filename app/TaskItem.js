//app/TaskItem.js
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TaskItem({ task, onToggle, isCompleting }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (isCompleting) {
      const interval = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);

      const timeout = setTimeout(() => {
        setCountdown(3);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setCountdown(3);
    }
  }, [isCompleting]);

  return (
    <View style={[styles.container, task.completed && styles.completed]}>
      <View style={styles.content}>
        <TouchableOpacity 
          onPress={onToggle} 
          style={styles.checkbox}
          disabled={task.completed}
        >
          <View style={[styles.checkboxInner, task.completed && styles.checked]}>
            {task.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text
            style={[styles.title, task.completed && styles.titleCompleted]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          {task.dueDate && (
            <Text style={styles.dueDate}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          )}
          {task.priority && (
            <View style={[styles.priorityBadge, styles[`priority${task.priority}`]]}>
              <Text style={styles.priorityText}>{task.priority}</Text>
            </View>
          )}
          {isCompleting && (
            <Text style={styles.countdown}>
              🗑️ Deleting in {countdown}s...
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  completed: {
    backgroundColor: '#f8fff8',
    borderColor: '#c8e6c9',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 16,
    marginTop: 2,
  },
  checkboxInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  dueDate: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },
  priorityHigh: {
    backgroundColor: '#ffebee',
  },
  priorityMedium: {
    backgroundColor: '#fff8e1',
  },
  priorityLow: {
    backgroundColor: '#e8f5e9',
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#555',
  },
  countdown: {
    fontSize: 12,
    color: '#ff6b6b',
    marginTop: 6,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});