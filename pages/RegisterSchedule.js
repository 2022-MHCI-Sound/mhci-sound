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
import PushNotificationIOS from '@react-native-community/push-notification-ios';


var db = openDatabase({ name: 'SoundNotification.db'});

const RegisterSchedule = ({ navigation }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  let [PushTime, setPushTime] = useState('');
  let [scheduleTime, setScheduleTime] = useState('');
  let [scheduleDescription, setScheduleDescription] = useState('');

  let register_schedule = () => {
    console.log(scheduleTime,  scheduleDescription);

    if (!scheduleTime) {
      alert('請輸入提醒時間！');
      return;
    }
    if (!scheduleDescription) {
      alert('請輸入提醒項目的簡易描述！');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO schedules (schedule_time, description) VALUES (?,?)',
        [scheduleTime, scheduleDescription],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            addNotification(results.insertId);
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
          } else alert('新增失敗');
        }
      );
    });
  };

  const addNotification = (id) => {
    PushNotificationIOS.addNotificationRequest({
      id: id.toString(),
      title: scheduleDescription,
      body: '吃完藥記得要去app裡按確認30分鐘內吃藥唷~',
      category: 'pill',
      threadId: id.toString(),
      fireDate: PushTime,
      repeats: true,
      sound: 'default',
      repeatsComponent: {
        hour: true,
        minute: true,
      },
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
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(hours);
    date.setMinutes(minutes);
    setPushTime(date);
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
                title="點擊以選擇時間"
              />
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="請輸入此提醒項目的簡單描述 e.g., 吃益生菌"
                onChangeText={
                  (scheduleDescription) => setScheduleDescription(scheduleDescription)
                }
                style={{ padding: 10 }}
              />
              <Mybutton title="新增" customClick={register_schedule} />
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
