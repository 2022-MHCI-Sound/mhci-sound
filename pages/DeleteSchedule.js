// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to update the user

import React, { useState } from 'react';
import {
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
import PushNotificationIOS from '@react-native-community/push-notification-ios';

var db = openDatabase({ name: 'SoundNotification.db'});

const ConfirmSchedule = ({ navigation }) => {
  let [inputScheduleId, setInputScheduleId] = useState('');
  let [scheduleData, setScheduleData] = useState({});

  let updateAllStates = (time, description, deleted) => {
    setScheduleTime(time);
    setScheduleDescription(description);
    setDeleted(deleted);
  };

  let searchSchedule = () => {
    console.log(inputScheduleId);
    setScheduleData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM schedules where schedule_id = ? and deleted != 1',
        [inputScheduleId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            // pass schedule data to the showing table
            setScheduleData(res);
            updateAllStates(
              res.schedule_time,
              res.description,
              res.deleted
            );
          } else {
            alert('No schedule found');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let deleteSchedule = () => {
    console.log(inputScheduleId, scheduleData.schedule_time, scheduleData.description, scheduleData.deleted);

    // set soft deleted as 1
    let soft_deleted = 1;

    if (!inputScheduleId) {
      alert('Please fill Schedule id');
      return;
    }
    PushNotificationIOS.removePendingNotificationRequests([inputScheduleId]);

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE schedules set schedule_time=?, description=? , deleted=? where schedule_id=?',
        [scheduleData.schedule_time, scheduleData.description, soft_deleted, inputScheduleId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success!',
              '成功刪除!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Deletion Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Schedule Id"
                style={{ padding: 10 }}
                onChangeText={
                  (inputScheduleId) => setInputScheduleId(inputScheduleId)
                }
              />
              <Mybutton
                title="Search Schedule"
                customClick={searchSchedule} 
              />
              <View
                style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10
                }}>
                <Text>Schedule Id: {scheduleData.schedule_id}</Text>
                <Text>Schedule Time: {scheduleData.schedule_time}</Text>
                <Text>Schedule Description: {scheduleData.description}</Text>
              </View>
              <Mybutton
                title="Delete Schedule"
                customClick={deleteSchedule}
              />
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

export default ConfirmSchedule;
