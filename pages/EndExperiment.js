// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useState, useEffect } from 'react';
import { Button, Alert, View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import { jsonToCSV } from 'react-native-csv';
import Mailer from 'react-native-mail';

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
    //   console.log(allScheduleData);
    //   console.log(allConfirmData);
      const scheduleCsv = jsonToCSV(allScheduleData)
      const confirmCsv = jsonToCSV(allConfirmData)
    //   setAllScheduleData(scheduleCsv);
    //   setAllConfirmData(confirmCsv);
    const handleEmail = () => {
        let bodyCsv = `${confirmCsv}\n${scheduleCsv}`
        console.log(bodyCsv);
        Mailer.mail({
          subject: '2022 MHCI Experiment End',
          recipients: ['joan.fu@iss.nthu.edu.tw'],
          ccRecipients: ['shelly.chao@iss.nthu.edu.tw'],
          body: bodyCsv,
          isHTML: true,
        }, (error, event) => {
          Alert.alert(
            error,
            event,
            [
              {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
              {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
            ],
            { cancelable: true }
          )
        });
      }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="確定要結束實驗嗎？" />
          <Mybutton
            title="確定"
            customClick={() => navigation.navigate('Register')}
          />
          <Button 
            onPress={handleEmail}
            title="確定唷"
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
