// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom TextInput

import React from 'react';
import { View, TextInput } from 'react-native';

const Mytextinput = (props) => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
        borderColor: '#6DD0CD',
        borderWidth: 1,
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor='#6DD0CD'
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};

export default Mytextinput;
