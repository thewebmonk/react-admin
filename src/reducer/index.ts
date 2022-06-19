import { combineReducers } from 'redux';
import loginReducer from '../pages/login/reducer';
import pageUIStateReducer from './page-ui-reduser';

const rootReducer = combineReducers({
  auth: loginReducer,
  pageUIState: pageUIStateReducer
});

export default rootReducer;
