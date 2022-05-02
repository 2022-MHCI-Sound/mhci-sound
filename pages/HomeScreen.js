// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

var db = openDatabase({ name: 'SoundNotification.db'});

const HomeScreen = ({ navigation }) => {

  PushNotificationIOS.getPendingNotificationRequests((requests) => {
     console.log('PendingNotificationRequest:',JSON.stringify(requests));
  });
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='schedules'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS schedules', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS schedules(schedule_id INTEGER PRIMARY KEY AUTOINCREMENT, schedule_time DATETIME, description TEXT, confirmed INTEGER DEFAULT 0 NOT NULL, deleted INTEGER DEFAULT 0 NOT NULL, created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, UNIQUE(schedule_time, description) )',
              []
            );
          }
        }
      );
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='confirms'",
        [],
        function (tx, res) {
          console.log('confirm_item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS confirms', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS confirms(confirm_id INTEGER PRIMARY KEY AUTOINCREMENT,schedule_id INTEGER UNSIGNED NOT NULL, created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (schedule_id) REFERENCES schedules (schedule_id) )',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="SQLite Example" />
          <Mybutton
            title="新增提醒項目"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="已於30分鐘內吃藥"
            customClick={() => navigation.navigate('Confirm')}
          />
          <Mybutton
            title="搜尋"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="檢視所有提醒項目"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="刪除提醒項目"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
        <View style={{ flex: 0.15 }}>
          <Mybutton
              title="結束實驗"
              customClick={() => navigation.navigate('End')}
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

export default HomeScreen;
