import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet

} from 'react-native';

import {
  OPERAND,
  buttons
} from './constants';

import Display from './components/display';
import Pad from './components/pad';

import { connect } from 'react-redux';
import * as actions from './store/actions'; 

import { 
  isClearOperator,
  isResultOperator,
  isBinaryOperator,
  isUnaryOperator,
  isLastBinaryOperator, 
  isLastOperand, 
  lastOperand,
  isOperand,
  operands
} from './utils/operators';


class Calculator extends Component {

  handleUnaryOperator = (operator) => {
    const { infix, Calculate } = this.props;

    if(isLastOperand(infix)) {
      Calculate(operator);
    } 
  }

  handleBinaryOperator = (operator) => {
    const { 
      infix,  
      OverrideLast, 
      UpdateNew,
      Calculate
    } = this.props;
    
    if(isLastBinaryOperator(infix)) {
      OverrideLast(operator);
    } else {
      const opnds = operands(infix);

      if(opnds.length === 2) {
        Calculate(operator);
      }

      if(opnds.length < 2) {
        UpdateNew(operator);
      }
    }
  }

  handleOperand = (operand) => {
    const { infix,  OverrideLast, UpdateNew, editing } = this.props;

    if(isLastOperand(infix)) {

      if(editing){
        const last = infix[infix.length - 1];
        OverrideLast(last + `${operand}`);
      } else {
        OverrideLast(operand);
      }

    }else {
      UpdateNew(operand);
    }
  }

  handleEvent = (value) => {

    switch(true) {

      case isOperand(value):
        this.handleOperand(value);
        break;

      case isBinaryOperator(value):
        this.handleBinaryOperator(value);
        break;

      case isUnaryOperator(value):
        this.handleUnaryOperator(value);
        break;

      case isResultOperator(value):
        this.props.Calculate();
        break;

       case isClearOperator(value):
        this.props.Clear()
        break;

      default:
        break;
    }
  }

  handlePress = (value, e) => {
    e.stopPropagation();
    this.handleEvent(value);
  }

  render() {
    const { infix } = this.props;
    const last = lastOperand(infix);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.display}>
          <Display value={last}/>
        </View>
        <View style={styles.keysPad}>
          <Pad  buttons={buttons} onPress={this.handlePress} />
        </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',

  },
  display: {
    flex: 3,
  },
  keysPad: {
    flex: 9,
  }
});

Calculator.propTypes = {
  infix: PropTypes.array,
  OverrideLast: PropTypes.func,
  UpdateNew: PropTypes.func,
  Calculate: PropTypes.func,
  editing: PropTypes.bool
}

Calculator.defaultProps = {
  infix: [0],
  editing: false
}

const mapToProps = (state) => {
  return {
  editing: state.calculator.editing,
  infix: state.calculator.infix
}};



export default connect(mapToProps, actions)(Calculator);
