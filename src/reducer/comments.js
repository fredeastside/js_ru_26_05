import { normalizedComments } from '../fixtures'
import { ADD_COMMENT } from '../constants';

export default (comments = normalizedComments, action) => {
  const { type, payload, response, error } = action;

  switch (type) {
      case ADD_COMMENT: return [...comments, payload];
  }
  return comments;
};
