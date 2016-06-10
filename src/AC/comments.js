import AppDispatcher from '../dispatcher';
import { ADD_COMMENT } from '../constants';

export function addComment(articleId, name, text) {
  const action = {
      type: ADD_COMMENT,
      payload: {
        articleId, name, text
      }
  }

  AppDispatcher.dispatch(action)
};
