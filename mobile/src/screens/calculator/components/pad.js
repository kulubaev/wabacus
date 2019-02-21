import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../store/actions'; 

import { 
  Text,
  TextInput,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet

} from 'react-native';

import Button from './button';


const  Pad = (props) => {

  const { buttons, onPress } = props;

  return (
    <View style={styles.container}>
      { buttons.map((row, i) => (
        <View key={`${i}-row`}style={styles.row}>
          {
            row.map((btn, j) => <Button key={`${j}-btn`} {...btn}  onPress={onPress} /> )
          }
        </View>))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: '5%',
    paddingTop: 0
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    
  }
});

export default Pad;

