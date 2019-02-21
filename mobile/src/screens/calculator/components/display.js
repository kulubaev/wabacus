import React, { Component } from 'react';

import {
  TextInput,
  View,
  StyleSheet
} from 'react-native';



const Display = ({value}) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={value.toString()} editable={false}/>
    </View>
  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight: '5%',
  },

  input: {

    flex: 1,
    flexDirection: 'row',

    borderColor: '#949494',
    borderWidth: 1,
    alignSelf: 'center',
    height: '70%',
    backgroundColor: '#fbfbfb',
    fontSize: 30,
    fontWeight: 'bold',
    padding: '5%',
    textAlign: 'right'

  }

});




export default Display;
