import { Link, useRouter } from 'expo-router';
import { Alert } from 'react-native';
//import toastr from "toastr";
//import "toastr/build/toastr.min.css";

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState('');
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const evaluatePasswordStrength = (password) => {
    let score = 0;
  
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++; // special character
  
    if (score <= 2) return 'Weak';
    if (score === 3 || score === 4) return 'Average';
    if (score === 5) return 'Strong';
  };
  
   
  const router = useRouter();

  const handleRegister = async () => {
    setPasswordError('');
    setError('');
    setPasswordStrength(''); // Hide password strength if there's an error
    
    if (!email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
  
    const passwordRules = [
      { test: /.{8,}/, message: 'Password must be at least 8 characters long!' },
      { test: /[A-Z]/, message: 'Password must contain at least 1 uppercase letter!' },
      { test: /[a-z]/, message: 'Password must contain at least 1 lowercase letter!' },
      { test: /[0-9]/, message: 'Password must contain at least 1 number!' },
    ];
  
    for (let rule of passwordRules) {
      if (!rule.test.test(password)) {
        setPasswordError(rule.message);
        setPasswordStrength(''); // Hide strength when error occurs
        return;
      }
    }
  
    try {
      const response = await fetch('http://192.168.68.104/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        Alert.alert('Success', result.success);
        router.push('/verify');
      } else {
        setError(result.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong!');
    }
  
    // toastr.success('User registered successfully', { position: 'top-center' });
    setError('');
    router.push('/verify'); // Navigate to verification screen after success
  };

  const isPasswordValid = () => {
    return (
      /.{8,}/.test(password) &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };
  
  const isFormValid = password === confirmPassword && isPasswordValid();  
  
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBackground}>
          <TouchableOpacity style={styles.backButton}>
            <Link href="/">
              <Image source={require('../../../assets/images/back.png')} style={styles.backIcon} />
            </Link>
          </TouchableOpacity>
          <Text style={styles.title}>Register</Text>
        </View>

        <View className="text-center">
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email :</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
          <Text style={styles.label}>Password :</Text>
          <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
              setPasswordStrength(evaluatePasswordStrength(text));
            }}
          />
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
          {passwordStrength ? (
            <Text style={{
              color: passwordStrength === 'Strong' ? 'green' :
                     passwordStrength === 'Average' ? 'orange' : 'red',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,
            }}>
              Strength: {passwordStrength}
            </Text>
          ) : null}
        </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password :</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />  
            </View>
            {password && confirmPassword && password !== confirmPassword ? (
                <Text style={styles.errorText2}>Passwords do not match!</Text>
              ) : null} 
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.registerbtn,
            { backgroundColor: isFormValid ? '#B4D2E7' : '#ccc' }, // change color if disabled
          ]}
          onPress={handleRegister}
          disabled={!isFormValid}
        >
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topBackground: {
    backgroundColor: '#B4D2E7',
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    fontSize: 18,
  },
  inputGroup: {
    left: 20,
    marginHorizontal: 30,
    marginTop: 45,
    width: 320,
    elevation: 3,
    
  },
  label: {
    fontSize: 18,
    color: '#5E5D5D',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#5E5D5D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  registerbtn: {
    backgroundColor: '#B4D2E7',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 65,
    width: '60%',
    alignSelf: 'center',
  },
  registerText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText2: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 25,
    marginBottom: 10,
  },
  
  
});
