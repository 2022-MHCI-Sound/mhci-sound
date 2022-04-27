// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to register the user

import React, { useState } from 'react';
import {
  Button,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


var db = openDatabase({ name: 'SoundNotification.db'});

const RegisterSchedule = ({ navigation }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  let [scheduleTime, setScheduleTime] = useState('');
  let [scheduleDescription, setScheduleDescription] = useState('');

  let register_schedule = () => {
    console.log(scheduleTime,  scheduleDescription);

    if (!scheduleTime) {
      alert('Please fill Schedule Time');
      return;
    }
    if (!scheduleDescription) {
      alert('Please fill Description of the schedule');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO schedules (schedule_time, description) VALUES (?,?)',
        [scheduleTime, scheduleDescription],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (scheduleTime) => {
    // use this format temporary (might need to change to cope with push notification mechanism)
    let hours = scheduleTime.getHours();
    let minutes = scheduleTime.getMinutes();
    let seconds = scheduleTime.getSeconds();
    let rawTime = `${hours}:${minutes}:${seconds}`;
    setScheduleTime(rawTime);
    hideTimePicker();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Button 
                onPress={showTimePicker}
                title="Set Schedule Time"
              />
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Schedule Description"
                onChangeText={
                  (scheduleDescription) => setScheduleDescription(scheduleDescription)
                }
                style={{ padding: 10 }}
              />
              <Mybutton title="Submit" customClick={register_schedule} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          2022 MHCI 
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterSchedule;