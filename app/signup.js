// app/signup.jsx
import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSignUp = () => {
    const { fullName, email, password, confirmPassword } = formData;
    
    // Validation
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      Alert.alert(
        'Success!',
        `Account created for ${fullName}`,
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
      setLoading(false);
    }, 1500);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join TaskMaster today</Text>

        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          style={styles.input}
          value={formData.fullName}
          onChangeText={(text) => updateField('fullName', text)}
          editable={!loading}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => updateField('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Create a password (min. 6 chars)"
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => updateField('password', text)}
          secureTextEntry
          editable={!loading}
        />

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm your password"
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(text) => updateField('confirmPassword', text)}
          secureTextEntry
          editable={!loading}
        />

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Already have account */}
        <TouchableOpacity 
          onPress={() => router.push('/login')}
          disabled={loading}
        >
          <Text style={styles.link}>
            Already have an account? <Text style={styles.linkBold}>Login</Text>
          </Text>
        </TouchableOpacity>

        {/* Demo credentials */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>For demo:</Text>
          <Text style={styles.demoText}>Name: John Doe</Text>
          <Text style={styles.demoText}>Email: test@example.com</Text>
          <Text style={styles.demoText}>Password: password123</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
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
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#666',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  linkBold: {
    color: '#2196F3',
    fontWeight: '600',
  },
  demoBox: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#f0f7ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cce5ff',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 13,
    color: '#0066cc',
    marginBottom: 4,
  },
});