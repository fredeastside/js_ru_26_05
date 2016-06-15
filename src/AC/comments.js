import { ADD_COMMENT, LOAD_COMMENTS_BY_ARTICLE_ID } from '../constants'
import AppDispatcher from '../dispatcher'
import { loadCommentsByArticleIdCall, asyncACFactory } from './webUtils'

export function addComment(articleId, comment) {
    const id = Date.now()
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        payload: {
            articleId,
            comment: {...comment, id}
        }
    })
}

export const loadCommentsByArticleId = asyncACFactory(loadCommentsByArticleIdCall, LOAD_COMMENTS_BY_ARTICLE_ID)
