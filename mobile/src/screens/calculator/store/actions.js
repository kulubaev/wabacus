import { arithmetics as api } from '../../../services';
import { 
  operands, 
  operator, 
  isUnaryOperator ,
  isBinaryOperator
} from '../utils/operators';


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


/**
 * @description Calculation
 *
 *
 */

export const Calculate = (op) => async(dispatch, state) => {

  const { calculator: {infix, page, interval} } = state();
  const opnds = operands(infix);
  const optr = operator(infix) || op;

  if (page !==0 ) {

    await dispatch(loadHistory(interval, { page }));
  }

  if((isBinaryOperator(optr) && opnds.length === 2) || (isUnaryOperator(optr) && opnds.length === 1)) {

    api.calculate(opnds, optr)
      .then((res) => {

        const { result , operation, expression, date } = res;

        dispatch({type: CALCULATE_OPERATION_SUCCESS});

        if(isUnaryOperator(op) && isBinaryOperator(optr)) {

          api.calculate([result], op)
            .then((res) => {

              dispatch({type: CALCULATE_OPERATION_SUCCESS});
              const { result , operation, expression, date } = res;
              dispatch({type: RESET, payload:[result]});


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
