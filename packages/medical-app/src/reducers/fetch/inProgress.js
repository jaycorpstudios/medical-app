const loadingState = {
  inProgress: true,
  success: false,
  error: false,
  errorMessage: null,
};

export default function inProgressReducer(state = {}) {
  return { ...state, ...loadingState };
}
