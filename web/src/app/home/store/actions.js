import { arithmetics as api } from '../../../services';
import { 
  operands, 
  operator, 
  isUnaryOperator ,
  isBinaryOperator
} from '../utilities/operators';

import { 
  UPDATE,
  OVERRIDE,
  RESET,
  ADD_OPERATION,
  SET_EDIT_MODE,
  SET_HISTORY
} from './action-types';


export const loadHistory = (interval, { page }) => (dispatch, state) => {

  api.chrono(interval, page)
    .then(result => {
      dispatch({type: SET_HISTORY, payload: result});
    });
}

export const SetEditMode = (mode) => (dispatch, state) => {
 dispatch({
   type: SET_EDIT_MODE,
   payload: mode
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

export const Calculate = (op) => (dispatch, state) => {

  const { home: {infix} } = state();
  const opnds = operands(infix);
  const optr = operator(infix) || op;

  if((isBinaryOperator(optr) && opnds.length === 2) || (isUnaryOperator(optr) && opnds.length === 1)) {

  api.calculate(opnds, optr)
    .then((res) => {
      // const payload = (isUnaryOperator(op) || op === '=') ? [result] : [ result, op ];

			const { result , operation, expression, date } = res;

			dispatch({type: ADD_OPERATION, payload:  { date, operation, result, expression}});

      if(isUnaryOperator(op) && isBinaryOperator(optr)) {
        api.calculate([result], op)
        .then((res) => {
			    const { result , operation, expression, date } = res;
          dispatch({type: RESET, payload:[result]});
          dispatch({type: ADD_OPERATION, payload:  { date, operation, result, expression}});
        })
        .catch((error) => {throw error});
      }

      if(isUnaryOperator(op) && optr === op) {
          dispatch({type: RESET, payload:[result]});
      }

      if(isBinaryOperator(op)) {
          dispatch({type: RESET, payload:[result, op]});
      }

      if(!op) {
        dispatch({type: RESET, payload:[result]});
      }

    })
    .catch((error) => {throw error});
  }
};

