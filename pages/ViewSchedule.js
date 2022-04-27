// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view single schedule

import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'SoundNotification.db'});

const ViewSchedule = () => {
  let [inputScheduleId, setInputScheduleId] = useState('');
  let [scheduleData, setScheduleData] = useState({});

  let searchSchedule = () => {
    console.log(inputScheduleId);
    setScheduleData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM schedules where schedule_id = ? and deleted != 1',
        [inputScheduleId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setScheduleData(results.rows.item(0));
          } else {
            alert('No schedule found');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Schedule Id"
            onChangeText={
              (inputScheduleId) => setInputScheduleId(inputScheduleId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Search Schedule" customClick={searchSchedule} />
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

export default ViewSchedule;
