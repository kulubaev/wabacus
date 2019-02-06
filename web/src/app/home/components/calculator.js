import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { 
  isLastBinaryOperator, 
  isLastOperand, 
  lastOperand,
  operands
} from '../utilities/operators';

import * as actions from '../store/actions'; 
import './styles/calculator.scss';

export class Calculator extends Component {

  handleClear = (e) => {
    e.preventDefault();
    this.props.Clear()
  }

  handleResult = (e) => {
    this.props.Calculate();
  }


  handleUnaryOperator = (e) => {
    e.preventDefault();
    const operator = e.target.value;

    const { infix, Calculate } = this.props;

    if(isLastOperand(infix)) {
      Calculate(operator);
    } 
  }


  handleBinaryOperator = (e) => {
    e.preventDefault();
    const operator = e.target.value;

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


  handleOperand = (e) => {
    e.preventDefault();
    const operand = e.target.value;
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

  render()  {
    const { infix } = this.props;
    const last = lastOperand(infix);

    return (
      <div className="calculator">
        <input type="text" className="calculator-screen" value={last} disabled />
        <div className="calculator-keys">

          <button onClick={this.handleBinaryOperator} type="button" className="operator" value="+">+</button>
          <button onClick={this.handleBinaryOperator} type="button" className="operator" value="-">-</button>
          <button onClick={this.handleBinaryOperator} type="button" className="operator" value="*">&times;</button>
          <button onClick={this.handleBinaryOperator} type="button" className="operator" value="/">&divide;</button>

          <button onClick={this.handleOperand} type="button" value="7">7</button>
          <button onClick={this.handleOperand} type="button" value="8">8</button>
          <button onClick={this.handleOperand} type="button" value="9">9</button>
          <button onClick={this.handleUnaryOperator} type="button" className="operator" value="$">&radic;</button>

          <button onClick={this.handleOperand} type="button" value="4">4</button>
          <button onClick={this.handleOperand} type="button" value="5">5</button>
          <button onClick={this.handleOperand} type="button" value="6">6</button>
          <button onClick={this.handleUnaryOperator} type="button" className="operator" value="#">&sup3;&radic;</button>

          <button onClick={this.handleOperand} type="button" value="3">3</button>
          <button onClick={this.handleOperand} type="button" value="2">2</button>
          <button onClick={this.handleOperand} type="button" value="0">0</button>

          <button onClick={this.handleUnaryOperator} type="button" className="operator" value="!">!</button>

          <button onClick={this.handleOperand} type="button" value="1">1</button>

          <button onClick={this.handleBinaryOperator} type="button" className="operator" value="^">x<sup>y</sup></button>

          <button onClick={this.handleOperand} type="button" value=".">.</button>

          <button onClick={this.handleClear} type="button" className="all-clear" value="">clr</button>
          <button onClick={this.handleResult}type="button" className="equal-sign" value="=">=</button>
        </div>
      </div>
    );
  }
}

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
  editing: state.home.editing,
  infix: state.home.infix
}};

export default connect(mapToProps, actions)(Calculator);

