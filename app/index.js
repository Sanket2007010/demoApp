// app/index.jsx
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/signup");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 TaskMaster</Text>
      <Text style={styles.subtitle}>Your Personal Task Manager</Text>
      <ActivityIndicator size="large" color="#1a1a1a" style={styles.loader} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#aaa",
    marginBottom: 40,
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
  },
});
