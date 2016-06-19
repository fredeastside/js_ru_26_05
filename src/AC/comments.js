import { ADD_COMMENT } from '../constants';

export function addComment(articleId, comment) {
  return {
    type: ADD_COMMENT,
    payload: {
      id: new Date(),
      text: comment.text,
      user: comment.user,
      articleId: articleId
    }
  };
}
