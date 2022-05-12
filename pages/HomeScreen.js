// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import Icon from './components/Icon';
import Logotext from './components/Logotext';
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
              'CREATE TABLE IF NOT EXISTS schedules(schedule_id INTEGER PRIMARY KEY AUTOINCREMENT, schedule_time DATETIME, description TEXT, confirmed INTEGER DEFAULT 0 NOT NULL, not_eat INTEGER DEFAULT 0 NOT NULL, deleted INTEGER DEFAULT 0 NOT NULL, created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, UNIQUE(schedule_time, description) )',
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
              'CREATE TABLE IF NOT EXISTS confirms(confirm_id INTEGER PRIMARY KEY AUTOINCREMENT,schedule_id INTEGER UNSIGNED NOT NULL, description TEXT, created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (schedule_id) REFERENCES schedules (schedule_id) )',
              []
            );
          }
        }
      );
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='sounds'",
        [],
        function (tx, res) {
          console.log('sound_item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS sounds', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS sounds(sound_id INTEGER PRIMARY KEY AUTOINCREMENT,sound_pswd TEXT, sound_name TEXT, picked INTEGER DEFAULT 0 NOT NULL, updated_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
              []
            );
						// insert pswd for each sound song
						txn.executeSql(
							'INSERT INTO sounds (sound_pswd, sound_name) VALUES (?,?)',
							['SNWwp', 'facetime_lyrics.mp3']
						);
						txn.executeSql(
							'INSERT INTO sounds (sound_pswd, sound_name) VALUES (?,?)',
							['rhC0b', 'facetime_instrumental.mp3']
						);
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'  }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ flex: 4, justifyContent: 'center' }}>
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<Icon
							imageSource={require('../assets/vitamins.png')}
						/>
					</View>
          <Mybutton
            title="輸入實驗起始密碼"
            customClick={() => navigation.navigate('Start')}
          />
          <Mybutton
            title="新增提醒項目"
            customClick={() => navigation.navigate('Register')}
          />
				</View>
				<View style={{ flex: 2 }}>
					<Mybutton
						title="檢視所有提醒項目"
						customClick={() => navigation.navigate('ViewAll')}
					/>
          <Mybutton
              title="結束實驗"
              customClick={() => navigation.navigate('End')}
          />
        </View>
				<Logotext text="2022 DingDongEat"/> 
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
