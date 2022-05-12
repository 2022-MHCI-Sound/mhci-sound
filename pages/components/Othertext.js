// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom Text

import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Othertext = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
		fontWeight: 'bold',
    textAlign: 'center',
    color: '#407d7b',
    fontSize: 16,
    padding: 10,
  },
});

export default Othertext;
