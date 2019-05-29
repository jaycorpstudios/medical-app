import {
  FETCH_IN_PROGRESS,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_RESET
} from './../../actions/types'
import inProgressReducer from './inProgress'
import successReducer from './success'
import errorReducer from './error'
import resetReducer from './reset'

const mapActionReducer = {
  [FETCH_IN_PROGRESS]: inProgressReducer,
  [FETCH_SUCCESS]: successReducer,
  [FETCH_ERROR]: errorReducer,
  [FETCH_RESET]: resetReducer
}
export default function fetchReducer (state = {}, action = {}) {
  const { type } = action
  const reducer = mapActionReducer[type]
  return reducer ? reducer(state, action) : state
}