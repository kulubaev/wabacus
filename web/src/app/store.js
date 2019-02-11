import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { home } from './home'; 
import generic  from './generic'; 
 
/* eslint-disable no-underscore-dangle */
const rootReducer = combineReducers({
  home,
  generic
},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

export default createStore(rootReducer, applyMiddleware(thunk));
