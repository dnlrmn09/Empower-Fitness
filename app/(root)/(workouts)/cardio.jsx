import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';

export default function CardioScreen({ navigation }) {
  const [selectedLevel, setSelectedLevel] = useState('Beginner'); // Current selected level
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state

  // Exercise data for each level (Cardio)
  const exerciseData = {
    Beginner: [
      { title: 'Shadow Boxing', time: '2 mins', reps: '30 reps', burn: '20 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Jumping Jacks', time: '1 min', reps: '30 reps', burn: '15 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Step Back Lunges', time: '2 mins', reps: '20 reps', burn: '25 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Jumping Squats', time: '2 mins', reps: '30 reps', burn: '15 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Modified Burpees', time: '1 min', reps: '10 reps', burn: '30 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Mountain Climbers', time: '1 min', reps: '20 reps', burn: '20 calories', icon: require('../../../assets/icons/cardioImage.png') },
    ],
    Intermediate: [
      { title: 'Shadow Boxing', time: '3 mins', reps: '45 reps', burn: '35 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Jumping Jacks', time: '2 mins', reps: '50 reps', burn: '25 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Step Back Lunges', time: '3 mins', reps: '30 reps', burn: '40 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Jumping Squats', time: '3 mins', reps: '40 reps', burn: '30 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Modified Burpees', time: '2 mins', reps: '15 reps', burn: '40 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Mountain Climbers', time: '2 mins', reps: '30 reps', burn: '30 calories', icon: require('../../../assets/icons/cardioImage.png') },
    ],
    Professional: [
      { title: 'Shadow Boxing', time: '4 mins', reps: '60 reps', burn: '50 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Jumping Jacks', time: '3 mins', reps: '70 reps', burn: '35 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Step Back Lunges', time: '4 mins', reps: '40 reps', burn: '50 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Jumping Squats', time: '4 mins', reps: '50 reps', burn: '40 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Modified Burpees', time: '3 mins', reps: '25 reps', burn: '50 calories', icon: require('../../../assets/icons/cardioImage.png') },
      { title: 'Mountain Climbers', time: '3 mins', reps: '40 reps', burn: '40 calories', icon: require('../../../assets/icons/cardioImage.png') },
    ],
  };
  

  const statsData = {
    Beginner: { exercises: 6, time: '9 minutes', calories: 125 },
    Intermediate: { exercises: 6, time: '15 minutes', calories: 200 },
    Professional: { exercises: 6, time: '21 minutes', calories: 215 },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.topBackground}>
        <TouchableOpacity style={styles.backButton} >
          <Link href="/activity"><Image source={require('../../../assets/icons/back.png')} style={styles.backIcon} /></Link>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cardio</Text>
        <Image source={require('../../../assets/icons/exercise.jpeg')} style={styles.exerciseImage} />

        <View style={styles.statWrap}>
          {/* Stats Container Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statsColumn}>
              <Text style={styles.statsText}>Total: {statsData[selectedLevel].exercises} exercises</Text>
              <Text style={styles.statsText}>Time: {statsData[selectedLevel].time}</Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.statsColumn}>
              <Text style={styles.statsText}>Calories you'll burn</Text>
              <Text style={styles.caloriesText}>{statsData[selectedLevel].calories} calories</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Content Below the Fixed Header */}
      <ScrollView style={styles.scrollContainer}>
        {/* Dropdown Button */}
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownVisible(!dropdownVisible)} 
          >
            <Text style={styles.dropdownText}>{selectedLevel.toUpperCase()}</Text>
          </TouchableOpacity>

          {/* Dropdown Options */}
          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              {['Beginner', 'Intermediate', 'Professional']
                .filter((level) => level !== selectedLevel) // Exclude the selected level
                .map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedLevel(level); // Set selected level
                        setDropdownVisible(false); // Hide dropdown
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{level}</Text>
                    </TouchableOpacity>
                  ))}
            </View>
          )}
        </View>

        {/* Exercise List for Selected Level */}
        {exerciseData[selectedLevel].map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <Image source={exercise.icon} style={styles.exerciseIcon} />
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseSubtitle}>
                Time: {exercise.time} | Repetition: {exercise.reps}
              </Text>
              <Text style={styles.exerciseBurn}>Burn: {exercise.burn}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.startButton}>
            <Link href="/shadowboxing"><Text style={styles.startText}>Start Workout</Text></Link>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  topBackground: {
    position: 'absolute', // Fix the header to the top
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#94C5CC',
    height: 246,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Keep it above the content
  },
  headerTitle: {
    position: 'absolute',
    top: 25,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
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
  verticalLine: {
    width: 1,
    backgroundColor: '#346473',
    height: '100%',
  },
  exerciseImage: {
    width: 352,
    height: 170,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 250,
  },
  statWrap: {
    backgroundColor: '#F6F6F6',
    paddingBottom: 20,
    marginBottom: 30,
    position: 'relative',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderRadius: 10,
    width: 354,
    height: 80,
    marginHorizontal: 20,
  },
  statsColumn: {
    alignItems: 'center',
  },
  statsText: {
    color: '#346473',
    fontSize: 14,
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#346473',
  },
  dropdownWrapper: {
    marginTop: 130,
    alignItems: 'center',
    marginVertical: 15,
    zIndex: 1000,
  },
  dropdownButton: {
    borderWidth: 2,
    borderColor: '#346473',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 354,
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#346473',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    borderColor: '#346473',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    width: 354,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#346473',
    textTransform: 'uppercase',
  },
  scrollContainer: {
    marginTop: 246,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 7,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exerciseIcon: {
    width: 70, // Increase the width
    height: 70, // Increase the height
    marginRight: 10,
    borderColor: '#D4CBE5',
    borderRadius: 50,
    borderWidth: 2,
    flexShrink: 0, // Prevent the icon from shrinking
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#346473',
  },
  exerciseSubtitle: {
    fontSize: 12,
    color: '#346473',
    marginTop: 3,
  },
  exerciseBurn: {
    fontSize: 12,
    color: '#FF6F61',
    marginTop: 3,
  },
  startButton: {
    backgroundColor: 'rgba(148, 197, 204, 0.5)',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: 348,
    height: 52,
    alignSelf: 'center',
  },

  startText: {
    color: '#346473',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
