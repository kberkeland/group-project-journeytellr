import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ant design import
import { message } from 'antd';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // console.log('in registeruser');
    
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: 'SET_TO_LOGIN_MODE'});
    yield put({type: 'CLEAR_REGISTRATION'});
  } catch (error) {
      console.log('Error with user registration:', error);
      message.error('Error in registration');
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
