import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import calculator from './screens/calculator/store';
import history from './screens/history/store';


const root = combineReducers({
  calculator,
  history
});


const enchancers = __DEV__ &&  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 


const configureStore = () => {
  return createStore(root, enchancers(applyMiddleware(thunk)));
}

export default configureStore;
