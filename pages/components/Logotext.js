// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom Text

import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Logotext = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
	text: {
		fontSize: 12,
		textAlign: 'center',
		color: 'grey',
		marginBottom: 10
	},
});

export default Logotext;
