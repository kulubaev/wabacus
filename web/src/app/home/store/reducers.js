import { 
  UPDATE,
  OVERRIDE,
  RESET,
  SET_EDIT_MODE,
  ADD_OPERATION,
  SET_HISTORY
} from './action-types';


const DEFAULT_STATE = {
  infix: [0],
  operations:[],
  editing: false
};

const reducer = (state = DEFAULT_STATE, action = {}) => {


  switch (action.type) {

    case SET_HISTORY:
      return {...state, operations: action.payload};

    case SET_EDIT_MODE:
      return {...state, editing: action.payload};

    case RESET: {
      const infix = [...action.payload];

      return {...state, infix, editing: false };
    }

    case OVERRIDE: {

      const infix = [...state.infix];
      infix.pop();
      infix.push(action.payload);

      return {...state, infix, editing: true };
    }

    case UPDATE: {

      const infix = [...state.infix];
      infix.push(action.payload);

      return {...state, infix, editing: true };
    }

    case ADD_OPERATION: 
      const operations = [...state.operations, {...action.payload, editing:false}]

      return {...state, operations };

    default:
      return state;
  }
}


export default reducer;
