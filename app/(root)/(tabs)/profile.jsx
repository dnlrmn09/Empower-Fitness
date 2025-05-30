import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router'; // Import useRouter for navigation

const menuItems = [
  {
    icon: "user-circle",
    text: "Personal Information",
    link: "/personal", // Link to Personal Information page
  },

  {
    icon: "cog",
    text: "General Settings",
    link: "/general", // Link to General Settings page
  },
  {
    icon: "info-circle",
    text: "About Us",
    link: "/aboutus", // Link to About Us page
  },
  {
    icon: "pen",
    text: "Feedback",
    link: "/feedback", // Link to Feedback page
  },
  {
    icon: "file-contract",
    text: "Privacy Policy",
    link: "/privacy", // Link to Privacy Policy page
  },
  {
    icon: "sign-out-alt",  // Add an icon for logout
    text: "Logout",
    action: "logout",  // Set action type for logout
  },
];

const ProfilePage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the user session or authentication token here (e.g., using AsyncStorage, Redux, etc.)
    // Example:
    // AsyncStorage.removeItem('user_token'); 

    // After clearing session, show a confirmation alert and navigate to the login page
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => router.push('/login') }, 
      ]
    );
  };

  return (
    <View style={styles.profileContainer}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={require('../../../assets/images/proficon.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Jamaielyn Gascon</Text>
        <Text style={styles.profileId}>ID: 19237458673469</Text>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menu}>
        {menuItems.map((item, index) => (
          item.action === 'logout' ? (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuItemContent}>
                <FontAwesome5 name={item.icon} size={20} color="#555" />
                <Text style={styles.menuItemText}>{item.text}</Text>
              </View>
              <FontAwesome5 name="chevron-right" size={16} color="#555" />
            </TouchableOpacity>
          ) : (
            <Link key={index} href={item.link} asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <FontAwesome5 name={item.icon} size={20} color="#555" />
                  <Text style={styles.menuItemText}>{item.text}</Text>
                </View>
                <FontAwesome5 name="chevron-right" size={16} color="#555" />
              </TouchableOpacity>
            </Link>
          )
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileHeader: {
    backgroundColor: '#94C5CC',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    color: '#ffffff',
  },
  profileId: {
    fontSize: 14,
    color: '#ffffff',
  },
  menu: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfilePage;
