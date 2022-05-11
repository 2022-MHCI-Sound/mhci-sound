// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to register the user

import React, { useState, useEffect } from 'react';
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
import Mytext from './components/Mytext';
import Pagebutton from './components/Pagebutton';
import Submitbutton from './components/Submitbutton';
import Icon from './components/Icon';
import Logotext from './components/Logotext';
import { openDatabase } from 'react-native-sqlite-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PushNotificationIOS from '@react-native-community/push-notification-ios';


var db = openDatabase({ name: 'SoundNotification.db'});

const RegisterSchedule = ({ navigation }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  let [PushTime, setPushTime] = useState('');
  let [PushLaterTime, setPushLaterTime] = useState('');
	let [scheduleTime, setScheduleTime] = useState('--:--');
  let [scheduleDescription, setScheduleDescription] = useState('');
  let [soundName, setSoundName] = useState('');

  let register_schedule = () => {
    console.log(scheduleTime,  scheduleDescription, soundName);

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
            addNotification(results.insertId, soundName.sound_name);
            Alert.alert(
              'Success',
              '此設定為重複性提醒',
							[
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ViewAll'),
                },
              ],
              { cancelable: false }
            );
          } else alert('新增失敗');
        }
      );
    });
  };

  const addNotification = (id, sound_name) => {
		console.log(sound_name);
    PushNotificationIOS.addNotificationRequest({
      id: id.toString(),
      title: scheduleDescription,
      body: '吃完藥記得要去app裡按確認30分鐘內吃藥唷~',
      category: 'pill',
      threadId: id.toString(),
      fireDate: PushTime,
      repeats: true,
      sound: sound_name,
      repeatsComponent: {
        hour: true,
        minute: true,
      },
    });
    PushNotificationIOS.addNotificationRequest({
      id: `30_${id.toString()}`,
      title: scheduleDescription,
      body: '貼心提醒，記得至DingdongEat回報今日的吃藥情形唷~ 若已回報請忽略：）',
      category: 'pill',
      threadId: id.toString(),
      fireDate: PushLaterTime,
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
		// hide sound in here
	  db.transaction(function (tx) {
			tx.executeSql(
				'SELECT * FROM sounds where picked = 1 order by updated_time desc',
				[],
				(tx, results) => {
					var len = results.rows.length;
					console.log('len', len);
					if (len > 0) {
						setSoundName(results.rows.item(0));
					} else {
						setSoundName('default');
					}
				}
			);
		});
		console.log(soundName);
    // use this format temporary (might need to change to cope with push notification mechanism)
		let hours = scheduleTime.getHours();
    let minutes = String(scheduleTime.getMinutes()).padStart(2, "0");
    let rawTime = `${hours}:${minutes}`;
    let laterDate = new Date(scheduleTime.getTime() + 25*60000);
    setScheduleTime(rawTime);
		setPushTime(scheduleTime);
    setPushLaterTime(laterDate);
		hideTimePicker();
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					{/* keyboard avoiding view is for datetime modal don't cover the other items, not sure if put the content in the middle is better, so comment it instead of remove it */}
					<ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
					<KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ flex:1,justifyContent: 'center' }}>
                <Icon
                  imageSource={require('../assets/timer.png')}
                />
								<Mytext text={`您選擇的時間為: ${scheduleTime}`}/>
                <Pagebutton 
                  title="點擊以選擇時間"
                  customClick={showTimePicker}
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
                <Submitbutton title="新增" customClick={register_schedule} />
              </View>
					</KeyboardAvoidingView>
          </ScrollView>
        </View>
				<Logotext text="2022 DingDongEat"/> 
      </View>
    </SafeAreaView>
  );
};

export default RegisterSchedule;
