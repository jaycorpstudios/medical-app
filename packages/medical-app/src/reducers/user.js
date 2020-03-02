import {
  USER_IN_PROGRESS,
  USER_SUCCESS,
} from '../actions/types';

function userDataInProgress(state, inProgress) {
  return { ...state, inProgress };
}

function setUserData(state, user) {
  return { ...state, data: user };
}

const initialState = {
  inProgress: false,
  data: {},
  error: {},
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case USER_IN_PROGRESS:
      return userDataInProgress(state, action.payload.status);
    case USER_SUCCESS:
      const { userData } = action.payload;
      return setUserData(state, userData);
    default:
      return state;
  }
}
