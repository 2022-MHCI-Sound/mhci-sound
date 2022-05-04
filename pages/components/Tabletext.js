// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom Text

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tabletext = (props) => {
	return (
		<View>
			<Text style={styles.text}>{props.text}
				<Text style={styles.subText}>{props.subText}</Text>
			</Text>
		</View>
	)
};

const styles = StyleSheet.create({
  text: {
		fontWeight: 'bold',
    color: '#407d7b',
    fontSize: 18,
    marginTop: 4,
  },
  subText: {
		fontWeight: 'normal',
    color: '#407d7b',
    fontSize: 16,
    marginTop: 2,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
});

export default Tabletext;
