import { ADD_COMMENT } from '../constants'
import AppDispatcher from '../dispatcher'

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
