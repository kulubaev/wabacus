import React from 'react';
import { 
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native';



const Button = (props) =>  {

  const { onPress, text, operator } = props;
  const style = props.style || {};

  return (
    <View style={[styles.container, style.button]} >
      <TouchableHighlight onPress={(e)=>onPress(operator || text, e)} style={[styles.button]}>
        <Text style={styles.text}>          
          {text}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles =  StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
  },
  
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderColor: '#c4c4c4',
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  text: {
    color: '#0a0a0a',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }

});


export default Button;
