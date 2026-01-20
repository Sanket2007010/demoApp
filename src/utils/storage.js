import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'TASKS_DATA';

export const getTasks = async () => {
  try {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error reading tasks', e);
    return [];
  }
};
// Add these functions to your existing storage.js file

// Get single task by ID
export const getTask = async (id) => {
  try {
    const tasks = await getTasks();
    return tasks.find(task => task.id === id);
  } catch (error) {
    console.error('Error getting task:', error);
    return null;
  }
};

// Update existing task
export const updateTask = async (id, updatedData) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, ...updatedData, updatedAt: new Date().toISOString() } : task
    );
    await saveTasks(updatedTasks);
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    return false;
  }
};

// Delete task by ID
export const deleteTaskById = async (id) => {
  try {
    const tasks = await getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    await saveTasks(filteredTasks);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};
export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error saving tasks', e);
  }
};
