// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view all the user*/

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Logotext from './components/Logotext';
import Otherbutton from './components/Otherbutton';
import Tabletext from './components/Tabletext';


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
				<Tabletext text="Id: " subText={item.schedule_id}/>
				<Tabletext text="提醒時間: " subText={item.schedule_time}/>
				<Tabletext text="描述: " subText={item.description}/>
        <View style={styles.fixToText}>
          <Otherbutton
            title="今日吃藥情形"
            customClick={() => navigation.navigate('Confirm', {item: item})}
          />
          <Otherbutton
            title="刪除此提醒"
            customClick={() => navigation.navigate('Delete', {item: item})}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
				<Logotext text="2022 DingDongEat"/> 
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
