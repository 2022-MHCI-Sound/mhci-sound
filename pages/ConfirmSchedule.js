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
	Text
} from 'react-native';
import Mybutton from './components/Mybutton';
import Othertext from './components/Othertext';
import Mytext from './components/Mytext';
import Tabletext from './components/Tabletext';
import Icon from './components/Icon';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'SoundNotification.db'});

const ConfirmSchedule = ({ route, navigation }) => {
  const item = route.params['item'];
  console.log(item);

  let confirmSchedule = () => {
    let new_confirmed = item['confirmed'] + 1;

    if (!item['schedule_id']) {
      alert('請返回上一頁選擇要確認的提醒項目');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE schedules set schedule_time=?, description=? , confirmed=? where schedule_id=?',
        [item['schedule_time'], item['description'], new_confirmed, item['schedule_id']],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Schedule confirmed successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('確認失敗');
        }
      );
      tx.executeSql(
        'INSERT INTO confirms (schedule_id) VALUES (?)',
        [item['schedule_id']]
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					{/*<ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
							style={{ flex: 1, justifyContent: 'space-between' }}>*/}
              <View
                style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10
                }}>
								<Text style={{padding: 10, textAlign: 'center',color:'#0abbb5', fontSize: 16}}>提醒聲響的30分鐘內吃藥才能按確定喔~</Text>
								<Icon
									imageSource={require('../assets/check.png')}
								/>
                <Mytext text="您剛剛選擇的項目為"/>
                <Tabletext text="項目ID: " subText={item['schedule_id']}/>
                <Tabletext text="提醒時間: " subText={item['schedule_time']}/>
                <Tabletext text="提醒項目描述: " subText={item['description']}/>
                <Tabletext text="吃藥次數: " subText={item['confirmed']}/>
              </View>
              <Mybutton
                title="確認已吃藥"
                customClick={confirmSchedule}
              />
					{/*</KeyboardAvoidingView>
					</ScrollView>*/}
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          2022 DingDongEat
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmSchedule;
