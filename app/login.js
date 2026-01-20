// app/login.jsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      Alert.alert('Success', 'Logged in successfully!');
      router.replace('/taskList');
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity 
        onPress={() => Alert.alert('Info', 'Password reset feature coming soon!')}
        disabled={loading}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Demo info */}
      <View style={styles.demoInfo}>
        <Text style={styles.demoTitle}>Demo Credentials:</Text>
        <Text style={styles.demoText}>Email: test@example.com</Text>
        <Text style={styles.demoText}>Password: password123</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 24, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 8,
    textAlign: 'center',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: { 
    borderWidth: 1.5, 
    borderColor: '#e0e0e0', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9'
  },
  button: { 
    backgroundColor: '#1a1a1a', 
    padding: 16, 
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  buttonDisabled: { 
    backgroundColor: '#666',
    opacity: 0.7
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: '600',
    fontSize: 16,
  },
  forgotText: {
    textAlign: 'center',
    color: '#2196F3',
    fontSize: 14,
    marginBottom: 24,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  demoInfo: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 4,
  },
});