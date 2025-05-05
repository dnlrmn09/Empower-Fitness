// import React, { useState } from 'react';
// import {Link} from 'expo-router';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from 'react-native';

// export default function VerifyScreen({ navigation }) {
//   const [otp, setOtp] = useState(['', '', '', '']); 

//   const handleInputChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Automatically focus the next input
//     if (value && index < otp.length - 1) {
//       const nextInput = `otp${index + 2}`;
//       this[nextInput]?.focus();
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton}>
//         <Link href="/register">
//             <Image source={require('../../../assets/images/back_gray.png')} style={styles.backIcon}/>
//         </Link>
//       </TouchableOpacity>

//       <View style={styles.mailContainer}>
//         <Image
//           source={require('../../../assets/images/mailbox.png')}
//           style={styles.mailIcon}
//         />
//       </View>

     
//       <View style={styles.message}>
//         <Text style={styles.heading}>Enter OTP</Text>
//         <Text style={styles.subline}>We have sent you access code</Text>
//         <Text style={styles.subline}>via Email for Mobile Verification</Text>
//       </View>


//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={styles.otpInput}
//             maxLength={1}
//             keyboardType="numeric"
//             value={digit}
//             onChangeText={(value) => handleInputChange(value, index)}
//             ref={(ref) => (this[`otp${index + 1}`] = ref)}
//           />
//         ))}
//       </View>


//       <TouchableOpacity style={styles.verifyButton}>
//         <Link href="/login">
//             <Text style={styles.verifyText}>VERIFY</Text>
//         </Link>
//       </TouchableOpacity>


//       <View style={styles.resendContainer}>
//         <Text style={styles.resendText}>Didn't Receive the OTP?</Text>
//         <TouchableOpacity>
//           <Text style={styles.resendButton}>Resend Code</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 30,
//     left: 20,
//   },
//   backIcon: {
//     width: 24,
//     height: 24,
//   },
//   mailContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   mailIcon: {
//     width: 120,
//     height: 124,
//   },
//   message: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#7AACB4',
//   },
//   subline: {
//     marginTop: 5,
//     fontSize: 14,
//     color: '#696868',
//     textAlign: 'center',
//     opacity: 0.74,
//   },
  
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 20,
//   },
//   otpInput: {
//     width: 40,
//     height: 48,
//     textAlign: 'center',
//     fontSize: 20,
//     color: '#7cafb8',
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 2,
//     marginHorizontal: 5,
//   },
//   verifyButton: {
//     backgroundColor: '#94C5CC',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 20,
//     marginVertical: 20,
//   },
//   verifyText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   resendContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   resendText: {
//     fontSize: 14,
//     color: '#696868',
//   },
//   resendButton: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#94C5CC',
//     marginTop: 5,
//   },
// });

import React, { useState, useRef } from 'react';
import { Link } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

export default function VerifyScreen({ navigation }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  // Handle OTP input changes
  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Function to verify OTP
  const verifyOTP = async () => {
    const enteredOtp = otp.join(''); // Convert OTP array to string
  
    if (enteredOtp.length !== 4) {
      Alert.alert("Error", "Please enter a valid 4-digit OTP.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost/verify-otp.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ otp: enteredOtp }) 
      });
  
      const data = await response.json();
      console.log("Response Data:", data); // Debug API response
  
      if (data.success) {
        Alert.alert("Success", "OTP Verified!", [{ 
          text: "OK", 
          onPress: () => navigation.replace("/login") // Correct navigation
        }]);
      } else {
        Alert.alert("Error", data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to verify OTP. Please try again later.");
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Link href="/register">
          <Image source={require('../../../assets/images/back_gray.png')} style={styles.backIcon} />
        </Link>
      </TouchableOpacity>

      <View style={styles.mailContainer}>
        <Image source={require('../../../assets/images/mailbox.png')} style={styles.mailIcon} />
      </View>

      <View style={styles.message}>
        <Text style={styles.heading}>Enter OTP</Text>
        <Text style={styles.subline}>We have sent you an access code</Text>
        <Text style={styles.subline}>via Email for verification</Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={verifyOTP}>
        <Text style={styles.verifyText}>VERIFY</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't Receive the OTP?</Text>
        <TouchableOpacity>
          <Text style={styles.resendButton}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  backButton: { position: 'absolute', top: 30, left: 20 },
  backIcon: { width: 24, height: 24 },
  mailContainer: { alignItems: 'center', marginBottom: 20 },
  mailIcon: { width: 120, height: 124 },
  message: { alignItems: 'center', marginVertical: 20 },
  heading: { fontSize: 20, fontWeight: 'bold', color: '#7AACB4' },
  subline: { marginTop: 5, fontSize: 14, color: '#696868', textAlign: 'center', opacity: 0.74 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  otpInput: {
    width: 40,
    height: 48,
    textAlign: 'center',
    fontSize: 20,
    color: '#7cafb8',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 5,
  },
  verifyButton: { backgroundColor: '#94C5CC', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 20, marginVertical: 20 },
  verifyText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  resendContainer: { alignItems: 'center', marginTop: 20 },
  resendText: { fontSize: 14, color: '#696868' },
  resendButton: { fontSize: 14, fontWeight: 'bold', color: '#94C5CC', marginTop: 5 },
});
