export default function highOrderReducer (meta, reducer) {
  const { initialState = {}, key = '' } = meta
  return function (state = initialState, action) {
    return action.key !== key ? state : reducer(state, action)
  }
}