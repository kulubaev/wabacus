import { StyleSheet } from 'react-native';

export const OPERAND = 'OPERAND';


export const OPERANDS=['0','1','2','3','4','5','6','7','8','9','.'];
export const BINARY_OPERATORS=['+','-','/','^','*'];
export const UNARY_OPERATORS=['!', 'cbrt','sqrt'];
export const CLEAR_OPERATORS=['Escape', 'clr'] ;
export const RESULT_OPERATORS= ['Enter', '='];


const style = StyleSheet.create({
  button:{
    flex: 2,
  }

})

export const buttons = [
  [ 
    { text: '+' },
    { text: '-' }, 
    { text: '*' },
    { text: '/' },
  ],
  [ 
    { text: '7' },
    { text: '8' }, 
    { text: '9' },
    { text: '√', operator: 'sqrt' },
  ],

  [ 
    { text: '4' },
    { text: '5' }, 
    { text: '6' },
    { text: '3√', operator: 'cbrt' },
  ],

  [ 
    { text: '3' },
    { text: '2' }, 
    { text: '0' },
    { text: '!' },
  ],

  [ 
    { text: '1' },
    { text: '.' },
    { text: 'clr', style }, 
  ],


  [ 
    { text: '=', style}, 
  ],
]
