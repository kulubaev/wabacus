
import {
  BINARY_OPERATORS,
  UNARY_OPERATORS,
  CLEAR_OPERATORS,
  RESULT_OPERATORS,
} from '../constants';


export const isNumber = (n) => !isNaN(parseFloat(n));

//export const isOperand = (op) => !(isBinaryOperator(op) || isUnaryOperator(op));
export const isOperand = (op) => /^(\.|-?[0-9])+$/.test(op);


export const isBinaryOperator = (op) => {
  return BINARY_OPERATORS.includes(op);
}

export const isClearOperator = (op) => {
  return CLEAR_OPERATORS.includes(op);
}

export const isResultOperator = (op) => {
  return RESULT_OPERATORS.includes(op);
}

export const isUnaryOperator = (op) => {
  return UNARY_OPERATORS.includes(op);
}

export const isLastBinaryOperator = (infix) => {
  const last = infix[infix.length - 1];
  return isBinaryOperator(last);
}

export const operator = (infix) => {
  return [...infix].reverse().find( v =>  isBinaryOperator(v));
}

export const lastOperand = (infix) => {
  return [...infix].reverse().find( v => isOperand(v));
}

export const operands = (infix) => {
  return [...infix].filter( v => isOperand(v));
}


export const isLastOperand = (infix) => {
  const last = infix[infix.length - 1];
  return isOperand(last);

}
