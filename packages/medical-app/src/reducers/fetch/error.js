const errorState = {
  inProgress: false,
  success: false,
  error: true,
};
export default function errorReducer(state = {}, action = {}) {
  const { message } = action;
  return { ...state, ...errorState, errorMessage: message };
}
