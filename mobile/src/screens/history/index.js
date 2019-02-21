import React, { Component } from 'react';
import { 
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet

} from 'react-native';

import { connect } from 'react-redux';

import { Navigation } from 'react-native-navigation';
import Footer from './components/chrono-footer';
import List from './components/chrono-list';

import {
  DEFAULT_PAGE,
  ALL 
 
}  from './constants';

import * as actions from './store/actions';


class History extends Component {

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }


  componentWillUnmount() {
    if(this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }


  componentDidAppear() {
    this.props.loadHistory(ALL, {page: DEFAULT_PAGE});
  }

  handleNext = () => {
    const { page } = this.props;
    this.props.loadHistory(ALL, {page: page + 1});
  }

  handlePrev = () => {
    const { page } = this.props;
    this.props.loadHistory(ALL, {page: page - 1});
  }


  handleReload = () => {
    const { page } = this.props;

    this.props.loadHistory(ALL, {page});
  }

  render() {
    const { data } = this.props;
    return (
      <SafeAreaView style={styles.container} >
        <View style={styles.header} >
          <Text style={styles.title}>History Screen</Text>
        </View>
        <View style={styles.listContainer}>
          <List 
            data={data}
            onNext={this.handleNext}
            onReload={this.handleReload}
            onPrev={this.handlePrev}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: '#ddd',
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5%',

    
  },

  title: {
    textTransform: 'uppercase',
  },


  listContainer : {
    flex: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: '5%',
    margin: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    backgroundColor: '#fafafa'
  },

});

const mapToProps = ({ history }) =>{

  return(
    {
      data: history.operations,
      page: history.page
    }
  );
}

export default connect(mapToProps, actions)(History);
