// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom Button

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#6DD0CD',
    color: '#ffffff',
    padding: 15,
    marginTop: 20,
    marginLeft: 80,
    marginRight: 80,
		borderRadius: 10,
  },
  text: {
    color: '#ffffff',
  },
});

export default Mybutton;
