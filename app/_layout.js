import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          title: 'Task List'
        }} 
      />
      <Stack.Screen 
        name="add-task" 
        options={{ 
          presentation: 'modal',
          title: 'Add New Task'
        }} 
      />
      <Stack.Screen 
        name="edit-task" 
        options={{ 
          presentation: 'modal',
          title: 'Edit Task'
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
          title: 'Login'
        }} 
      />
    </Stack>
  );
}