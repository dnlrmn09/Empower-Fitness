import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet,
  Text, View,
  TextInput, TouchableOpacity,
  Image, ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Make sure you import the CSS

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const handlesubmit = () => {   
    console.log('Login button clicked');
    toastr.success('Login Successfully', {position: 'top-center'});
    router.push('/home');  
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBackground}>
          <TouchableOpacity style={styles.backButton}>
            <Link href="/index">
              <Image source={require('../../../assets/images/back.png')} style={styles.backIcon} />
            </Link>
          </TouchableOpacity>
          <Text style={styles.topTitle}>Login</Text> 
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/favicon.png')} style={styles.logo} />
            <Text style={styles.title}>EMPOWER FITNESS</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            keyboardType="email-address"
            value={email} 
            onChangeText={setEmail} 
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
              value={password} 
              onChangeText={setPassword} 
            />
            <TouchableOpacity style={styles.showPasswordButton} onPress={togglePasswordVisibility} />
          </View>

          {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}

          <TouchableOpacity style={styles.loginButton} onPress={handlesubmit}> 
            <Text style={styles.loginText}>LOG IN</Text>
          </TouchableOpacity>

          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topTitle: {
    position: 'absolute',
    top: 25,  
    alignSelf: 'center', 
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  topBackground: {
    backgroundColor: '#B4D2E7',
    height: 400,
    width: '100%',
    borderBottomLeftRadius: 112,
    borderBottomRightRadius: 112,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logoContainer: {
    position: 'absolute',
    top: 100, 
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  formContainer: {
    position: 'absolute',
    top: 300,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingLeft: 0,
    fontSize: 16,
    color: '#5E5D5D',
  },
  passwordContainer: {
    position: 'relative',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  loginButton: {
    backgroundColor: '#B4D2E7',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  loginText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 10,
    color: '#5E5D5D',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  hrContainer: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  hrLine: {
    width: '25%',
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    color: '#8A8A8A',
    fontSize: 14,
    paddingHorizontal: 10, 
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
});
