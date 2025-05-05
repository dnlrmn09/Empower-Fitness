import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker'; 
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [chartWidth, setChartWidth] = useState(screenWidth - 40); // Initial width
  const [selectedOption, setSelectedOption] = useState("weekly"); // State to track Weekly/Monthly

  useEffect(() => {
    // Update chart width when screen size changes (e.g., orientation change)
    const onChange = () => {
      setChartWidth(Dimensions.get('window').width - 40); // 40px for padding
    };

    Dimensions.addEventListener('change', onChange);
    
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  // Weekly data (Mon-Fri)
  const weeklyChartData = [
    { label: 'Mon', value: 30 },
    { label: 'Tue', value: 60 },
    { label: 'Wed', value: 90 },
    { label: 'Thu', value: 120 },
    { label: 'Fri', value: 80 },
  ];

  // Monthly data (Months of the year)
  const monthlyChartData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 200 },
    { label: 'Apr', value: 180 },
    { label: 'May', value: 160 },
    { label: 'Jun', value: 220 },
    { label: 'Jul', value: 210 },
    { label: 'Aug', value: 180 },
    { label: 'Sep', value: 190 },
    { label: 'Oct', value: 200 },
    { label: 'Nov', value: 170 },
    { label: 'Dec', value: 220 },
  ];

  // Choose which data to display based on the selected option
  const chartData = selectedOption === "weekly" ? weeklyChartData : monthlyChartData;
  const labels = chartData.map(item => item.label);
  const values = chartData.map(item => item.value);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.upperBackground} />

    
        <Text className="text-center font-poppins-bold text-primary-100 text-3xl">
           {/* space */}
        </Text>


        {/* Welcome Section */}
        <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.userName}>User!</Text>
        </View>

        {/* Activities Progress Section */}
        <View style={styles.activitiesContainer}>
          <Text style={styles.activitiesTitle}>Activities Progress</Text>
          <View style={styles.activitiesRow}>
            <View style={styles.activityItem}>
              <FontAwesome name="fire" size={30} color="black" />
              <Text style={styles.activityValue}>2116</Text>
              <Text style={styles.activityLabel}>Calories</Text>
            </View>
            <View style={styles.activityItem}>
              <FontAwesome name="clock-o" size={30} color="black" />
              <Text style={styles.activityValue}>24</Text>
              <Text style={styles.activityLabel}>Hours</Text>
            </View>
            <View style={styles.activityItem}>
              <FontAwesome name="check-circle" size={30} color="black" />
              <Text style={styles.activityValue}>16</Text>
              <Text style={styles.activityLabel}>Complete Exercises</Text>
            </View>
          </View>
        </View>

        {/* Statistics Section 
        <View style={styles.statisticsContainer}>
          
          <TouchableOpacity>
            <Text style={styles.viewLink}>View</Text>
          </TouchableOpacity>
        </View>
        */}
        <Text style={styles.statisticsTitle}>Statistics</Text>


        {/* Goal Progress Section */}
        <View style={styles.goalProgressContainer}>
          <View style={styles.goalProgressHeader}>
            <Text style={styles.goalProgressTitle}>Goal Progress</Text>

            {/* Week/Month Picker */}
            <Picker
              selectedValue={selectedOption}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedOption(itemValue)}
            >
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
            </Picker>

          </View>

          {/* BarChart Component */}
          <View style={styles.chartContainer}>
            <BarChart
              data={{
                labels: labels,
                datasets: [{ data: values }],
              }}
              width={chartWidth} // Dynamically set width
              height={220}
              chartConfig={{
                backgroundColor: '#eafafc',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#eafafc',
                decimalPlaces: 0, // No decimal points
                color: () => '#94C5CC', // Solid color (no opacity)
                labelColor: () => '#000000',
                barPercentage: 0.7,
                propsForBackgroundLines: {
                  strokeWidth: 0.5,
                  stroke: '#d3d3d3',
                  strokeDasharray: '0',
                },
              }}
              style={{
                borderRadius: 10,
              }}
            />
          </View>
        </View>

        {/* Challenge Section */}
        <View style={styles.challengeContainer}>
          <Text style={styles.challengeTitle}>Day 2 of your 30-day Upper Body Challenge</Text>
        </View>

        {/* Daily Section */}
        <View style={styles.dailyContainer}>
          <View style={styles.dailySection}>
            <Text style={styles.dailyTitle}>Daily Exercise</Text>
            <Text style={styles.dailyItem}>Warm up</Text>
            <Text style={styles.dailyItem}>Stretching</Text>
          </View>
          <View style={styles.dailySection}>
            <Text style={styles.dailyTitle}>Daily Reminder</Text>
            <Text style={styles.dailyItem}>Sleep 8 - 12 hrs</Text>
            <Text style={styles.dailyItem}>Drink 8 - 12 glasses of water</Text>
          </View>
        </View>

        <View style={styles.encouragementContainer}>
          <Text style={styles.encouragementText}>
            Keep Going! You're further along than you were yesterday!
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  picker: {
    height: 50,
    width: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  upperBackground: {
    height: 200,
    backgroundColor: '#94C5CC',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 18,
    color: '#FFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  activitiesContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  activitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityItem: {
    alignItems: 'center',
    width: '30%',
  },
  activityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  activityLabel: {
    fontSize: 14,
    color: '#666',
  },
  statisticsContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  statisticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10
  },
  viewLink: {
    color: '#1e90ff',
    textAlign: 'right',
  },
  goalProgressContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  goalProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalProgressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chartContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  challengeContainer: {
    marginBottom: 20,
    backgroundColor: '#d4f4f4',
    padding: 15,
    borderRadius: 10,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dailyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dailySection: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  dailyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dailyItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  encouragementContainer: {
    backgroundColor: '#fffbe0',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  encouragementText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  navItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  navText: {
    fontSize: 14,
    color: '#666',
  },
  activeNavItem: {
    backgroundColor: '#a6d6d4',
    borderRadius: 5,
  },
  activeNavText: {
    color: '#fff',
  },
});