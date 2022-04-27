// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import { jsonToCSV } from 'react-native-csv';

var db = openDatabase({ name: 'SoundNotification.db'});

const EndExperiment = ({ navigation }) => {
    let [allScheduleData, setAllScheduleData] = useState([]);
    let [allConfirmData, setAllConfirmData] = useState([]);
    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM schedules',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                setAllScheduleData(temp);
            }
          );
        });
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM confirms',
              [],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                  setAllConfirmData(temp);
              }
            );
          });
      }, []);
      console.log(allScheduleData);
      console.log(allConfirmData);
      const csv = jsonToCSV(allScheduleData)
      console.log(csv);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="確定要結束實驗嗎？" />
          <Mybutton
            title="確定"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="取消"
            customClick={() => navigation.navigate('HomeScreen')}
          />
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

export default EndExperiment;
