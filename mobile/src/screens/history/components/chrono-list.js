import React, { Component } from 'react'; 

import {
  Text,
  FlatList,
  View,
  StyleSheet
} from 'react-native';

import Header from './chrono-header';
import Footer from './chrono-footer';
import { columns } from '../constants';


class ChronoList extends Component {

  renderItem = ({item}) => {

    return (
      <View style={styles.row}>
        {
          columns.map((col, i) => (
            <View key={`${i}-col`} style={[styles.column], [{width: `${col.width}`}]}>
              <Text 
                numberOfLines={1}
                style={styles.text}
              >{item[col.key]}</Text>
            </View>
          )) 
        }
      </View>
    )
  }

  render() {
    const { data, onNext, onReload, onPrev } = this.props;
    const cols = columns;
    return(
      <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item,index) => `${index}-row`}
        renderItem={this.renderItem}
        ListHeaderComponent={Header}
      />
      <View style={styles.footer}>
        <Footer 
          onPrev={onPrev}
          onReload={onReload}
          onNext={onNext}
        />
      </View>

    </View>
      )
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },


  list: {
    alignContent: 'stretch',
    alignSelf: 'stretch',
    position: 'relative',
    flex: 15,

  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%'

  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom:10 

  },

  column: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },

  text: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',

  }


})



export default ChronoList;
