export const isNumber = (n) => !isNaN(parseFloat(n));

export const isOperand = (op) => !(isBinaryOperator(op) || isUnaryOperator(op));



export const isBinaryOperator = (op) => {
  return ['+', '-', '*', '/', '^'].includes(op);
}

export const isUnaryOperator = (op) => {
  return [ '!', '$','#'].includes(op);
}

export const isLastBinaryOperator = (infix) => {
  const last = infix[infix.length - 1];
  return isBinaryOperator(last);
}

export const operator = (infix) => {
  return [...infix].reverse().find( v =>  ['+', '-', '*', '/', '^'].includes(v));
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
