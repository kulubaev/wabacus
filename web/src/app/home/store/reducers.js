import { 
  UPDATE,
  OVERRIDE,
  RESET,
  SET_EDIT_MODE,
  ADD_OPERATION,
  LOAD_OPERATIONS_HISTORY_SUCCESS,
  LOAD_EXPORT_DATA_SUCCESS,
  SET_INTERVAL
} from './action-types';

import {
	BUSY
} from '../../generic/store/action-types';

import {
  ALL 
} from '../constants';

const PAGE_SIZE = 15;

const DEFAULT_STATE = {
  infix: [0],
  operations:[],
  page: 0,
  editing: false,
  exportData: [],
  interval: ALL 
};

const reducer = (state = DEFAULT_STATE, action = {}) => {


  switch (action.type) {

    case action.type.substring(action.type.length - 6) === 'FAILED': {
      const { busy } = state;
      return { ...state, busy: busy ? busy - 1 : busy};
    }

		case action.type.substring(action.type.length - 7) === 'SUCCESS': {
      const { busy } = state;
			return { ...state, ...action.payload, busy: busy ? busy - 1 : busy};
    }

    case BUSY: {
      const { busy } = state;
      return { ...state, busy: busy + 1};
    }

    case LOAD_OPERATIONS_HISTORY_SUCCESS:
      return {...state, ...action.payload};

    case LOAD_EXPORT_DATA_SUCCESS:
      return {...state, exportData: action.payload};
 
    case SET_EDIT_MODE:
      return {...state, editing: action.payload};
 
    case SET_INTERVAL:
      return {...state, interval: action.payload};

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
