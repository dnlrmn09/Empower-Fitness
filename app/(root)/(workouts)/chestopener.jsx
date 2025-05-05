import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { Link } from 'expo-router';

export default function App() {
  const [timer, setTimer] = useState(60); // Set the initial countdown time in seconds

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000); // Decrement timer every second

      return () => clearInterval(interval); // Cleanup interval when the component unmounts
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`; // Format as mm:ss
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Link href="/upperbody"><FontAwesome name="arrow-left" style={styles.backArrow} /></Link>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Top Icons */}
        <View style={styles.icons}>
          <FontAwesome name="volume-up" style={styles.icon} />
          <FontAwesome name="cog" style={styles.icon} />
        </View>

        {/* Reaction Icons */}
        <View style={styles.reactionIcons}>
          <FontAwesome name="thumbs-up" style={styles.icon} />
          <FontAwesome name="thumbs-down" style={styles.icon} />
        </View>

        {/* GIF/Video Container */}
        <View style={styles.gifContainer}>
          <Video
            source={require('../../../assets/images/CHESTOPENER.mp4')} // Correct path
            style={styles.gif}
            resizeMode="cover"
            isLooping
            isMuted
            shouldPlay
          />
        </View>

        {/* Exercise Name */}
        <Text style={styles.exerciseText}>CHEST OPENER</Text>

        {/* Timer */}
        <Text style={styles.repetitionText}>{formatTime(timer)}</Text>

        {/* Done Button */}
        <TouchableOpacity style={styles.doneButton}>
          <FontAwesome name="check" style={styles.doneIcon} />
          <Link href="/wallpushup"><Text style={styles.doneText}>DONE</Text></Link>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="caret-left" style={styles.footerIcon} />
          <Link href="/armcircle"><Text style={styles.footerText}>Previous</Text></Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="caret-right" style={styles.footerIcon} />
          <Link href="/wallpushup"><Text style={styles.footerText}>Skip</Text></Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#94C5CC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backArrow: {
    fontSize: 20,
    color: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  icons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 10,
  },
  reactionIcons: {
    position: 'absolute',
    top: 200,
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    fontSize: 18,
    color: '#ffffff',
    backgroundColor: '#D3D3D3',
    padding: 6,
    borderRadius: 20,
  },
  gifContainer: {
    marginTop: 50,
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: '100%',
    height: 300,
  },
  exerciseText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  repetitionText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333',
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#94C5CC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  doneIcon: {
    fontSize: 20,
    color: '#ffffff',
    marginRight: 10,
  },
  doneText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    width: '100%',
    height: 60,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerIcon: {
    fontSize: 20,
    color: '#666',
    marginRight: 5,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
});
