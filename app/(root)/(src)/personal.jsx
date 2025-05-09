import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Link, useRouter} from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';


const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [weight, setWeight] = useState(''); // Default weight
  const [height, setHeight] = useState(''); // Default height in cm
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [targetWeight, setTargetWeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [weightStatus, setWeightStatus] = useState('');

  
  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Handle deletion of the account
  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => console.log("Account deleted") },
    ]);
  };

  const getWeightStatus = (bmi) => {
  if (bmi < 16) return "Severely Underweight";
  if (bmi >= 16 && bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi <= 24.9) return "Healthy Weight";
  if (bmi > 24.9 && bmi <= 29.9) return "Overweight";
  if (bmi >= 30 && bmi <= 34.9) return "Moderately Obese";
  if (bmi > 34.9) return "Very Obese";
  return "Unknown";
};

const getStatusColor = (status) => {
  switch (status) {
    case "Severely Underweight": return "#FF3D00";
    case "Underweight": return "#FFA000";
    case "Healthy Weight": return "#4CAF50";
    case "Overweight": return "#FFC107";
    case "Moderately Obese": return "#FF5722";
    case "Very Obese": return "#D32F2F";
    default: return "#333";
  }
};

  const router = useRouter();

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost/personal.php?id=11');
        const json = await response.json();
        const weightValue = Number(json.user.weight || 0);
        const heightValue = Number(json.user.height || 0);
  
        if (json.success) {
          setName(json.user.name || '');
          setNickname(json.user.nickname || '');
          setSex(json.user.sex || '');
          setAge(json.user.age || '');
          setBirthdate(json.user.birthdate);
          setWeight(weightValue);
          setHeight(heightValue);


          if (heightValue && weightValue) {
            const heightInMeters = heightValue / 100;
            const bmiValue = (Number(json.user.weight) / (heightInMeters ** 2)).toFixed(1);
            setBmi(bmiValue);
            setWeightStatus(getWeightStatus(bmiValue));

            const lower = (18.5 * heightInMeters * heightInMeters).toFixed(1);
            const upper = (24.9 * heightInMeters * heightInMeters).toFixed(1);
            setTargetWeight({ lower, upper });
          }
          
        } else {
          console.warn('Failed to load profile:', json.message);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBackground}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/profile')} >
          <Image source={require('../../../assets/images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.titles}>Profile</Text>
      </View>

      <ScrollView style={styles.profileContainer}>
        <View style={styles.profilePictureSection}>
          <Image
            source={
              profileImage ? { uri: profileImage } : require('../../../assets/images/jam.jpeg')
            }
            style={styles.profileImage}
          />
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>{name}</Text>
            <Link href="/editprofile">
              <Icon name="pencil" size={20} color="#555" />
            </Link>
          </View>
          <Text style={styles.profileUsername}>@{nickname}</Text>
        </View>

        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.label}>Sex:</Text>
            <Text style={styles.value}>{sex}</Text>
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.row}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{age}</Text>
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.row}>
            <Text style={styles.label}>Birthdate:</Text>
            <Text style={styles.value}>{birthdate}</Text>
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.row}>
            <Text style={styles.label}>Height:</Text>
            <Text style={styles.value}>{height} cm</Text>
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.row}>
            <Text style={styles.label}>Weight:</Text>
            <Text style={styles.value}>{weight} kg</Text>
          </View>
          <View style={styles.line}></View> {/* Horizontal Line */}

          <View style={styles.targetWeightSection}>
            <View style={styles.row}>
              <View >
                <Text style={styles.label}>Target Weight:</Text>
                <Text style={styles.value}>
                  {targetWeight ? `${targetWeight.lower}kg - ${targetWeight.upper}kg` : 'Calculating...'}
                </Text>
              </View>
              <View style={{ marginLeft: 45 }}></View>
              <View>
                <Text style={styles.label}>Current Status:</Text>
                <Text style={[styles.value, { color: getStatusColor(weightStatus) }]}>{weightStatus}</Text>
              </View>
            </View>
          </View>

        </View>

        <View style={styles.deleteButtonSection}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2E3D0",
  },
  topBackground: {
    backgroundColor: '#94C5CC',
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  titles: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  backIcon: {
    width: 26,
    height: 26,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
  },
  profilePictureSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "#9ed0d9",
    padding: 5,
    borderRadius: 20,
  },
  editText: {
    color: "#fff",
    fontSize: 12,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  profileNameContainer: {
    flexDirection: 'row',  // This aligns the name and icon horizontally
    alignItems: 'center',  // Vertically centers the icon with the name
  },
  profileUsername: {
    fontSize: 14,
    color: "gray",
  },
  details: {
    padding: 20,
  },
  line: {
    height: 1,               // Adjust the height of the line
    backgroundColor: '#ccc', // Line color (you can choose any color)
    marginVertical: 10,      // Adjust spacing around the line
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "gray",
  },
  targetWeightSection: {
    marginTop: 20,
    alignItems: "center",
  },
  targetWeightText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  deleteButtonSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  // (Your existing styles here)
  valueInput: {
    fontSize: 16,
    color: "#555",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 5,
    width: 100,
    textAlign: "center",
  },
  targetWeightText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },

  statusText: {
    marginTop: 4,
    fontSize: 14,
    color: "#333",
  },
  statusValue: {
    fontWeight: "bold",
    color: "#1e88e5", // blue, you can change to red/yellow based on severity
  },
});

export default ProfilePage;
