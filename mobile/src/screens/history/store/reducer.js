import { 
  LOAD_OPERATIONS_HISTORY_SUCCESS,
  ADD_OPERATION,
  SET_INTERVAL
} from './action-types';

import {
  ALL,
  PAGE_SIZE,
} from '../constants';


const DEFAULT_STATE = {
  operations:[],
  page: 0,
  interval: ALL 
};


const reducer = (state = DEFAULT_STATE, action = {}) => {

  switch (action.type) {

   case LOAD_OPERATIONS_HISTORY_SUCCESS:
      return {...state, ...action.payload};
 
    case SET_INTERVAL:
      return {...state, interval: action.payload};

    case ADD_OPERATION: 

      const operations = [{...action.payload}, ...state.operations ].slice(0, PAGE_SIZE);

      return {...state, operations, editing:false, page:0};

    default:
      return state;
  }
}


export default reducer;
