import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const TargetWeightInfo = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost/height_weight.php?id=11`);
        const data = await response.json();

        console.log("Fetched data:", data);

        if (data.height && data.weight) {
          setHeight(data.height);
          setWeight(data.weight);
        } else {
          console.warn("Invalid or missing height/weight in response");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!height || !weight) {
    return <Text style={styles.bold}>Loading...</Text>;
  }

  return (
    <View>
      <Text style={styles.infoLabel}>Height:</Text>
      <Text style={styles.bold}>{height} cm</Text>

      <Text style={styles.infoLabel}>Weight:</Text>
      <Text style={styles.bold}>{weight} kg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TargetWeightInfo;
