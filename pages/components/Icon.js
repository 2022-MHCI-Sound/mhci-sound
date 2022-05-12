import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Icon = props => {
    return (
      <View style={styles.image_container}>
        <Image source={props.imageSource} style={styles.image}/>
      </View>
    );
};

const styles = StyleSheet.create({
  image: {
		resizeMode: 'contain',
    height: 200,
    width: 200,
  },
  image_container: {
		justifyContent: "center",
		alignItems: "center",
  },
});

export default Icon;
