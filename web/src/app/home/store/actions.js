import { arithmetics as api } from '../../../services';
import { 
  operands, 
  operator, 
  isUnaryOperator ,
  isBinaryOperator
} from '../utilities/operators';

import {
  BUSY
} from '../../generic/store/action-types';

import { 
  UPDATE,
  OVERRIDE,
  RESET,
  ADD_OPERATION,
  SET_EDIT_MODE,
  LOAD_OPERATIONS_HISTORY_SUCCESS,
  LOAD_OPERATIONS_HISTORY_FAILED,
  LOAD_EXPORT_DATA_SUCCESS,
  LOAD_EXPORT_DATA_FAILED,
  CALCULATE_OPERATION_FAILED,
  CALCULATE_OPERATION_SUCCESS,
  SET_INTERVAL
} from './action-types';


export const loadHistory = (interval, { page }) => (dispatch, state) => {

  dispatch({type: BUSY});
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

  dispatch({type: BUSY});

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

export const SetEditMode = (mode) => (dispatch, state) => {
  dispatch({
    type: SET_EDIT_MODE,
    payload: mode
  });
};

export const SetInterval = (interval) => (dispatch, state) => {
  dispatch({
    type: SET_INTERVAL,
    payload: interval
  });
};


export const UpdateNew = (op) => (dispatch, state) => {
  dispatch({
    type: UPDATE,
    payload: op
  });
};

export const OverrideLast = (op) => (dispatch, state) => {
  dispatch({
    type: OVERRIDE,
    payload: op
  });
};

export const Clear = () => (dispatch, state) => {

  dispatch({
    type: RESET,
    payload: [0]
  })
}

export const Calculate = (op) => async(dispatch, state) => {

  const { home: {infix, page, interval} } = state();
  const opnds = operands(infix);
  const optr = operator(infix) || op;

  if (page !==0 ) {

    await dispatch(loadHistory(interval, { page }));
  }

  if((isBinaryOperator(optr) && opnds.length === 2) || (isUnaryOperator(optr) && opnds.length === 1)) {

    dispatch({type: BUSY});

    api.calculate(opnds, optr)
      .then((res) => {
        // const payload = (isUnaryOperator(op) || op === '=') ? [result] : [ result, op ];

        const { result , operation, expression, date } = res;

        dispatch({type: CALCULATE_OPERATION_SUCCESS});
        dispatch({type: ADD_OPERATION, payload:  { date, operation, result, expression}});

        if(isUnaryOperator(op) && isBinaryOperator(optr)) {

          dispatch({type: BUSY});
          api.calculate([result], op)
            .then((res) => {

              dispatch({type: CALCULATE_OPERATION_SUCCESS});
              const { result , operation, expression, date } = res;
              dispatch({type: RESET, payload:[result]});

              dispatch({type: ADD_OPERATION, payload:  { date, operation, result, expression}});

            })
            .catch((error) => {
              dispatch ({type: CALCULATE_OPERATION_FAILED });
              throw error;
            });
        }

        if(!op || (isUnaryOperator(op) && optr === op)) {
          dispatch({type: RESET, payload:[result]});
        }

        if(isBinaryOperator(op)) {
          dispatch({type: RESET, payload:[result, op]});
        }

      })
      .catch((error) => {

        dispatch ({type: CALCULATE_OPERATION_FAILED });
        throw error;
      });
  }
};

