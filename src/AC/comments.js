import AppDispatcher from '../dispatcher';
import { ADD_COMMENT } from '../constants';

export function addComment(comment) {
  const action = {
      type: ADD_COMMENT,
      payload: comment
  };

  AppDispatcher.dispatch(action);
}
