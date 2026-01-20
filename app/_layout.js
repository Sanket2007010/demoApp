// app/_layout.js
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />     {/* Splash */}
      <Stack.Screen name="signup" />    {/* Sign Up */}
      <Stack.Screen name="login" />     {/* Login */}
      <Stack.Screen name="taskList" />  {/* Task List */}
      <Stack.Screen name="add-task" />  {/* Add Task */}
    </Stack>
  );
}