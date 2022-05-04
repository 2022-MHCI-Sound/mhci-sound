import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Icon = props => {
    console.log(props);
    return (
      <View style={styles.image_container}>
        <Image source={props.imageSource} style={styles.image}/>
      </View>
    );
};

const styles = StyleSheet.create({
  image: {
		resizeMode: 'center',
    height: 200,
    width: 200,
  },
  image_container: {
		justifyContent: "center",
		alignItems: "center",
  },
});

export default Icon;
