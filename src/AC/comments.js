import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, LOAD_ALL_COMMENTS } from '../constants'

export function addComment(articleId, comment) {
    return {
        type: ADD_COMMENT,
        payload: {
            articleId,
            comment: {...comment}
        },
        withRandomId: true
    }
}

export function loadCommentsForArticle(id) {
    return {
        type: LOAD_COMMENTS_FOR_ARTICLE,
        payload: { id },
        callAPI: `/api/comment?article=${id}`
    }
}

export function loadAllComments(page = 1, limit) {
  return {
    type: LOAD_ALL_COMMENTS,
    payload: { page, limit },
    callAPI: `/api/comment`
  }
}
