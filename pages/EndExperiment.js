// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useState, useEffect } from 'react';
import { Alert, View, Text, SafeAreaView, StyleSheet } from 'react-native';
import EndLeftbutton from './components/EndLeftbutton';
import EndRightbutton from './components/EndRightbutton';
import Icon from './components/Icon';
import Logotext from './components/Logotext';
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

  const scheduleCsv = jsonToCSV(allScheduleData)
  const confirmCsv = jsonToCSV(allConfirmData)

  const handleEmail = () => {
    let bodyCsv = `${confirmCsv}\n${scheduleCsv}`
    console.log(bodyCsv);
    Mailer.mail({
      subject: '2022 DingDongEat Experiment End',
      recipients: ['joan.fu@iss.nthu.edu.tw'],
      ccRecipients: ['shelly.chao@iss.nthu.edu.tw','lonetwyl@gmail.com','nikkieliao1224@gmail.com','karen.chiu@iss.nthu.edu.tw'],
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Icon
						imageSource={require('../assets/exit_2.png')}
					/>
          <Mytext text="???????????????????????????" />
					<View style={styles.fixToText}>
						<EndLeftbutton 
							customClick={handleEmail}
							title="??????"
						/>
						<EndRightbutton
							title="??????"
							customClick={() => navigation.navigate('HomeScreen')}
						/>
					</View>
        </View>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            color: 'grey',
						marginBottom: 5
          }}>
          ?????????????????????????????????????????????
        </Text>
				<Logotext text="??????????????????????????? DingDongEat ????????????"/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default EndExperiment;
