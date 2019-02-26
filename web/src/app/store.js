import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { store as calculator }  from './calculate'; 
import { store as history }  from './history'; 
 
/* eslint-disable no-underscore-dangle */
const rootReducer = combineReducers({
  calculator,
  history
},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

export default createStore(rootReducer, applyMiddleware(thunk));
