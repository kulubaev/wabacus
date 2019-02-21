import React from 'react';

import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native';


const Footer = ({onReload, onNext, onPrev}) => (

  <View style={styles.container}>
    <TouchableHighlight onPress={onPrev} style={styles.column}>
      <Text style={styles.text}>prev</Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={onReload} style={styles.column}>
      <Text style={styles.text}>reload</Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={onNext} style={styles.column}>
      <Text style={styles.text}>next</Text>
    </TouchableHighlight>
  </View>
)


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,

 },

  column: {
    flex: 1,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1
  },

  text: {
    textAlign: 'center',
    color: '#0a0a0a',
    fontWeight: 'bold',
    borderColor: '#c4c4c4',
  }
  


});

export default Footer;
