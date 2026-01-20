import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{task.title}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  text: {
    fontSize: 16,
  },
  delete: {
    color: '#d00',
    fontWeight: '600',
  },
});
