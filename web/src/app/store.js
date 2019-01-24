import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { home } from './home'; 

const rootReducer = combineReducers({
  home
});

export default createStore(rootReducer, applyMiddleware(thunk));
