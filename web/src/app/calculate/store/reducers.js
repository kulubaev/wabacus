
import { 
  UPDATE,
  OVERRIDE,
  RESET,
  SET_EDIT_MODE,
  ADD_OPERATION,
  CALCULATE_OPERATION_SUCCESS,
  CALCULATE_OPERATION_FAILED,
  BUSY
} from './action-types';

import {
  PAGE_SIZE
} from '../constants';


const DEFAULT_STATE = {
  infix: [0],
  editing: false,
  busy:0
};

const reducer = (state = DEFAULT_STATE, action = {}) => {


  switch (action.type) {

    case  BUSY:
      return {...state, busy: state.busy + 1};

    case CALCULATE_OPERATION_SUCCESS:
      return {...state, busy: state.busy - 1, ...action.payload};

    case CALCULATE_OPERATION_FAILED:
      return {...state, busy: state.busy - 1 };

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

      const operations = [{...action.payload}, ...state.operations ].slice(0, PAGE_SIZE);

      return {...state, operations, editing:false, page:0};

    default:
      return state;
  }
}


export default reducer;
