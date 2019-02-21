import { 
  UPDATE,
  OVERRIDE,
  RESET,
  SET_EDIT_MODE,
  ADD_OPERATION,
} from './action-types';


const DEFAULT_STATE = {
  infix: [0],
  operations:[],
  page: 0,
  editing: false,
};

const reducer = (state = DEFAULT_STATE, action = {}) => {


  switch (action.type) {

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


    default:
      return state;
  }
}


export default reducer;
