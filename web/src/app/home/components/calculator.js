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
import './styles/components/_calculator.scss';

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
        <input type="text" className="calculator__screen" value={last} disabled />
        <div className="calculator__keys">

          <button onClick={this.handleBinaryOperator} type="button" className="calculator__btn operator" value="+">+</button>
          <button onClick={this.handleBinaryOperator} type="button" className="calculator__btn operator" value="-">-</button>
          <button onClick={this.handleBinaryOperator} type="button" className="calculator__btn operator" value="*">&times;</button>
          <button onClick={this.handleBinaryOperator} type="button" className="calculator__btn operator" value="/">&divide;</button>

          <button onClick={this.handleOperand} type="button" value="7" className="calculator__btn" >7</button>
          <button onClick={this.handleOperand} type="button" value="8" className="calculator__btn">8</button>
          <button onClick={this.handleOperand} type="button" value="9" className="calculator__btn">9</button>
          <button onClick={this.handleUnaryOperator} type="button" className="calculator__btn operator" value="$">&radic;</button>

          <button onClick={this.handleOperand} type="button" value="4" className="calculator__btn" >4</button>
          <button onClick={this.handleOperand} type="button" value="5" className="calculator__btn">5</button>
          <button onClick={this.handleOperand} type="button" value="6" className="calculator__btn">6</button>
          <button onClick={this.handleUnaryOperator} type="button" className="calculator__btn operator" value="#">&sup3;&radic;</button>

          <button onClick={this.handleOperand} type="button" value="3" className="calculator__btn">3</button>
          <button onClick={this.handleOperand} type="button" value="2" className="calculator__btn">2</button>
          <button onClick={this.handleOperand} type="button" value="0" className="calculator__btn">0</button>

          <button onClick={this.handleUnaryOperator} type="button" className="calculator__btn operator" value="!">!</button>

          <button onClick={this.handleOperand} type="button" value="1" className="calculator__btn">1</button>

          <button onClick={this.handleBinaryOperator} type="button" className="calculator__btn operator" value="^">x<sup>y</sup></button>

          <button onClick={this.handleOperand} type="button" value="." className="calculator__btn">.</button>

          <button onClick={this.handleClear} type="button" className="calculator__btn all-clear" value="">clr</button>
          <button onClick={this.handleResult}type="button" className="calculator__btn calculator__btn--equal" value="=">=</button>
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

