// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to update the user

import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

var db = openDatabase({ name: 'SoundNotification.db'});

const DeleteSchedule = ({ route, navigation }) => {
  const item = route.params['item'];
  console.log('id:', item['schedule_id'].toString());

  let deleteSchedule = () => {
    // set soft deleted as 1
    let soft_deleted = 1;

    if (!item['schedule_id']) {
      alert('請返回上一頁選擇要刪除的提醒項目');
      return;
    }
    PushNotificationIOS.removePendingNotificationRequests([item['schedule_id'].toString()]);

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE schedules set schedule_time=?, description=? , deleted=? where schedule_id=?',
        [item['schedule_time'], item['description'], soft_deleted, item['schedule_id']],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Schedule deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('刪除失敗');
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
              <View
                style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10
                }}>
                <Text style={{ color:'#f05555' }}>您剛剛選擇要刪除的項目為</Text>
                <Text>項目ID: {item['schedule_id']}</Text>
                <Text>提醒時間: {item['schedule_time']}</Text>
                <Text>提醒項目描述: {item['description']}</Text>
              </View>
              <Mybutton
                title="刪除提醒項目"
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
          2022 DingDongEat
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

export default DeleteSchedule;
