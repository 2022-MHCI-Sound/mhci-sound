// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view all the user*/

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mybutton from './components/Mybutton';


var db = openDatabase({ name: 'SoundNotification.db'});

const ViewAllSchedules = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM schedules WHERE deleted != 1',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Id: {item.schedule_id}</Text>
        <Text>提醒時間: {item.schedule_time}</Text>
        <Text>描述: {item.description}</Text>
        <View style={styles.fixToText}>
          <Mybutton
            title="確認已吃藥"
            customClick={() => navigation.navigate('Confirm', {item: item})}
          />
          <Mybutton
            title="刪除此提醒"
            customClick={() => navigation.navigate('Delete', {item: item})}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
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
const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default ViewAllSchedules;
