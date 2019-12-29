const successState = {
  inProgress: false,
  success: true,
  error: false,
  errorMessage: null,
};
export default function successReducer(state = {}) {
  return { ...state, ...successState };
}
