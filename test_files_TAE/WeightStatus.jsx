import React from "react";
import { View, Text, StyleSheet } from "react-native";

const getStatusColor = (status) => {
  switch (status) {
    case "Severely Underweight":
      return "#FF3D00";
    case "Underweight":
      return "#FFA000";
    case "Healthy Weight":
      return "#4CAF50";
    case "Overweight":
      return "#FFC107";
    case "Moderately Obese":
      return "#FF5722";
    case "Very Obese":
      return "#D32F2F";
    default:
      return "#333";
  }
};

const WeightStatus = ({ weightStatus }) => {
  return (
    <View>

        <Text style={styles.statusText}>
        Current Status:{" "}
        </Text>
        <Text style={[styles.statusValue, { color: getStatusColor(weightStatus) }]}>
            {weightStatus}
        </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  statusText: {
    fontSize: 16,
    marginTop: 10,
  },
  statusValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default WeightStatus;