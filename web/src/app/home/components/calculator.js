import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../store/actions'; 
import './styles/components/_calculator.scss';

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
} from '../utilities/operators';


export class Calculator extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyUp);
  }

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



  handleKeyUp = (e) => {
    e.preventDefault();
    this.handleEvent(e.key);
  }

  handleButtonPress = (e) => {
    e.preventDefault();
    this.handleEvent(e.target.value);
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


  render()  {
    const { infix } = this.props;
    const last = lastOperand(infix);

    return (
      <div className="calculator">
        <input type="text" className="calculator__screen" value={last} disabled />
        <div className="calculator__keys"  onClick={this.handleButtonPress} >
          <button type="button" className="calculator__btn operator" value="+">+</button>
          <button type="button" className="calculator__btn operator" value="-">-</button>
          <button type="button" className="calculator__btn operator" value="*">&times;</button>
          <button type="button" className="calculator__btn operator" value="/">&divide;</button>

          <button type="button" value="7" className="calculator__btn" >7</button>
          <button type="button" value="8" className="calculator__btn">8</button>
          <button type="button" value="9" className="calculator__btn">9</button>

          <button type="button" className="calculator__btn operator" value="cbrt">&radic;</button>

          <button type="button" value="4" className="calculator__btn" >4</button>
          <button type="button" value="5" className="calculator__btn">5</button>
          <button type="button" value="6" className="calculator__btn">6</button>

          <button type="button" className="calculator__btn operator" value="sqrt">&sup3;&radic;</button>

          <button type="button" value="3" className="calculator__btn">3</button>
          <button type="button" value="2" className="calculator__btn">2</button>
          <button type="button" value="0" className="calculator__btn">0</button>

          <button type="button" className="calculator__btn operator" value="!">!</button>

          <button type="button" value="1" className="calculator__btn">1</button>

          <button type="button" className="calculator__btn operator" value="^">x<sup>y</sup></button>

          <button type="button" value="." className="calculator__btn">.</button>

          <button type="button" className="calculator__btn all-clear" value="clr">clr</button>
          <button type="button" className="calculator__btn calculator__btn--equal" value="=">=</button>
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

