import React from 'react';
import {

  Text,
  View,
  StyleSheet

} from 'react-native';


import { columns } from '../constants';

const ChronoHeader = (props) => (
  <View style={styles.container} >
    {
      columns.map((col, i) => (
        <View key={`${i}-col`} style={[styles.column], [{width: `${col.width}`}]}>
          <Text style={styles.text}>{col.label}</Text>
        </View>))
    }

  </View>

);


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  column: {
    justifyContent: 'center',
    alignItems: 'center'

  },

  text: {
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: '10%',
    flexWrap: 'nowrap',
    textDecorationLine: 'underline'
  }



})


export default ChronoHeader;
