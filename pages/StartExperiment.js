// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useState, useEffect } from 'react';
import { Button, Alert, View, Text, SafeAreaView } from 'react-native';
import Submitbutton from './components/Submitbutton';
import Icon from './components/Icon';
import Mytextinput from './components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'SoundNotification.db'});

const StartExperiment = ({ navigation }) => {
  let [startPassword, setStartPassword] = useState('');

  let matchSound = () => {
    console.log(startPassword, setStartPassword);

    if (!startPassword) {
      alert('請輸入實驗起始密碼！');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE sounds set picked=?, updated_time=CURRENT_TIMESTAMP where sound_pswd=?',
        [1, startPassword],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              '成功輸入實驗起始密碼',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('起始密碼輸入錯誤，請重新輸入。');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Icon
						imageSource={require('../assets/insurance.png')}
					/>
					<Mytextinput
						placeholder="請輸入實驗起始密碼"
						onChangeText={
							(startPassword) => setStartPassword(startPassword)
						}
						style={{ padding: 10 }}
					/>
          <Submitbutton title="送出" customClick={matchSound} />
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

export default StartExperiment;
