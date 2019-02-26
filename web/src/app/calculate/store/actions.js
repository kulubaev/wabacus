import { arithmetics as api } from '../../../services';
import { loadHistory } from '../../history/store/actions';
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
  CALCULATE_OPERATION_FAILED,
  CALCULATE_OPERATION_SUCCESS,
  BUSY
} from './action-types';


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

export const Calculate = (op) => async(dispatch, state) => {

  const { calculator: {infix} } = state();
  const opnds = operands(infix);
  const optr = operator(infix) || op;

  /*
  if (page !==0 ) {

    await dispatch(loadHistory(interval, { page }));
  }
  */

  if((isBinaryOperator(optr) && opnds.length === 2) || (isUnaryOperator(optr) && opnds.length === 1)) {

    dispatch({type: BUSY});

    new Promise((resolve, reject) => {
      api.calculate(opnds, optr)
        .then((res) => {
          // const payload = (isUnaryOperator(op) || op === '=') ? [result] : [ result, op ];

          const { result , operation, expression, date } = res;

          dispatch({type: CALCULATE_OPERATION_SUCCESS});
          //dispatch({type: ADD_OPERATION, payload:  { date, operation, result, expression}});

          if(isUnaryOperator(op) && isBinaryOperator(optr)) {

            dispatch({type: BUSY});
            api.calculate([result], op)
              .then((res) => {

                dispatch({type: CALCULATE_OPERATION_SUCCESS});
                const { result , operation, expression, date } = res;
                dispatch({type: RESET, payload:[result]});

                //   dispatch({type: ADD_OPERATION, payload:  { date, operation, result, expression}});

                resolve();
                
              })
              .catch((error) => {
                dispatch ({type: CALCULATE_OPERATION_FAILED });
                throw error;
              });
          }else{
            resolve();
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

    })
      .then(() => {
        const { history: {interval, page } } = state();

        dispatch(loadHistory(interval, {page: 0}));

      })
    ;
  
};

}
