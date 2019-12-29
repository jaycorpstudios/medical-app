
import {
  FETCH_IN_PROGRESS,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_RESET,
} from './types';

export function fetchInProgress(key) {
  return {
    type: FETCH_IN_PROGRESS,
    key,
  };
}

export function fetchSuccess(key) {
  return {
    type: FETCH_SUCCESS,
    key,
  };
}

export function fetchError(key, message) {
  return {
    type: FETCH_ERROR,
    key,
    message,
  };
}
export function fetchReset(key) {
  return {
    type: FETCH_RESET,
    key,
  };
}
