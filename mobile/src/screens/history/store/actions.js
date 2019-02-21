import { arithmetics as api } from '../../../services';
import {

  LOAD_OPERATIONS_HISTORY_SUCCESS,
  LOAD_OPERATIONS_HISTORY_FAILED,
  LOAD_EXPORT_DATA_SUCCESS,
  LOAD_EXPORT_DATA_FAILED,
  SET_INTERVAL

} from './action-types';

export const loadHistory = (interval, { page }) => (dispatch, state) => {

  page = page > 0 && page || 0;

  dispatch({type: SET_INTERVAL, payload: interval});

  return  new Promise((resolve, reject) => {
    api.chrono(interval, page)
      .then(result => {
        const isEmpty = !(result && result.length);

        if(!isEmpty || page === 0) {
          dispatch({
            type: LOAD_OPERATIONS_HISTORY_SUCCESS, 
            payload: {page, operations: result}});
        }else {
          dispatch({
            type: LOAD_OPERATIONS_HISTORY_FAILED, 
          });
        }
        resolve();
      })
      .catch((error) => {
        dispatch({
          type: LOAD_OPERATIONS_HISTORY_FAILED, 
        });
        reject();
      })
  })
}

export const loadExportData = (interval) => (dispatch, state ) => {

  dispatch( {type: SET_INTERVAL, payload: interval} );

  return new Promise((resolve, reject) => {api.chrono(interval)
      .then(result => {
        dispatch({type: LOAD_EXPORT_DATA_SUCCESS, payload: result}); 
        resolve();
      })
      .catch((error) => {
        dispatch({
          type: LOAD_EXPORT_DATA_FAILED, 
        });
      })
  });
}


