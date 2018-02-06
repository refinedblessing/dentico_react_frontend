import {
  success,
  error,
  warning,
  info
} from '../actionTypes/notificationActionTypes';

const initialState = { message: '' };

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case success:
      return { message: action.message, level: 'success' };
    case error:
      return { message: action.message, level: 'error' };
    case warning:
      return { message: action.message, level: 'warning' };
    case info:
      return { message: action.message, level: 'info' };
    default:
      return state;
  }
};

export default notificationReducer;