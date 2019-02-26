import { 
  LOAD_OPERATIONS_HISTORY_SUCCESS,
  LOAD_OPERATIONS_HISTORY_FAILED,
  LOAD_EXPORT_DATA_SUCCESS,
  LOAD_EXPORT_DATA_FAILED,
  BUSY,
  SET_INTERVAL
} from './action-types';

import {
  ALL,
} from '../constants';


const DEFAULT_STATE = {
  operations:[],
  page: 0,
  exportData: [],
  interval: ALL ,
  busy:0
};

const reducers = (state = DEFAULT_STATE, action = {}) => {

  switch (action.type) {

    case  BUSY: 

      return {...state, busy: state.busy + 1};

    case LOAD_OPERATIONS_HISTORY_SUCCESS: {
      const busy = state.busy > 0 ? state.busy -1 : state.busy;
      return {...state, busy, ...action.payload};
    }

    case LOAD_OPERATIONS_HISTORY_FAILED:
      const busy = state.busy > 0 ? state.busy -1 : state.busy;
      return {...state, busy };

    case LOAD_EXPORT_DATA_SUCCESS:
      return {...state, busy: state.busy - 1, exportData: action.payload};

    case LOAD_EXPORT_DATA_FAILED:
      return {...state, busy: state.busy - 1 };

    case SET_INTERVAL:
      return {...state, interval: action.payload};

    default:
      return state;
  }
}


export default reducers;
