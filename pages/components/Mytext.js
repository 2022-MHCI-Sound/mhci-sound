// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom Text

import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Mytext = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
		fontWeight: 'bold',
    textAlign: 'center',
    color: '#407d7b',
    fontSize: 21,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    padding: 10,
  },
});

export default Mytext;
