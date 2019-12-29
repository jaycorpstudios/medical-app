const resetState = {
  inProgress: false,
  success: false,
  error: false,
  errorMessage: null,
};
export default function resetReducer(state = {}) {
  return { ...state, ...resetState };
}
