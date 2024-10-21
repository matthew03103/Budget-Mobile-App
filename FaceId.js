import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';

const FaceId = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={require('../assets/FaceID.png')}  // Adjust the path if needed
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 100,  // Adjust to fit your design
    height: 100, // Adjust to fit your design
  },
});

export default FaceId;
