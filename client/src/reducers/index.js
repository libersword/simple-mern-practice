import { combineReducers } from 'redux';
import itemReducer from './iR'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
})