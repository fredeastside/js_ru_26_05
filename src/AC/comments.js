import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, START, SUCCESS } from '../constants'
import $ from 'jquery'

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

export function loadCommentsForArticle(article) {
    return (dispatch, getState) => {
        dispatch({
            type: LOAD_COMMENTS_FOR_ARTICLE + START,
            payload: article
        })

        setTimeout(() => {
            $.get(`/api/comment?article=${article.id}`)
                .done(response => dispatch({
                    type: LOAD_COMMENTS_FOR_ARTICLE + SUCCESS,
                    response,
                    payload: article
                }))
        }, 1000)
    }
}
