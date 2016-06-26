import { DELETE_ARTICLE, LOAD_ALL_ARTICLES, LOAD_ARTICLE_BY_ID, SUCCESS, START } from '../constants'
import $ from 'jquery'

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function loadAllArticles() {
    return (dispatch, getState) => {
        dispatch({
            type: LOAD_ALL_ARTICLES + START
        })

        setTimeout(() => {
            $.get('/api/article')
                .done(response => dispatch({
                    type: LOAD_ALL_ARTICLES + SUCCESS,
                    response
                }))
        }, 1000)
    }
}

export function loadArticleById({ id }) {
  return (dispatch, getState) => {
    dispatch({
        type: LOAD_ARTICLE_BY_ID + START,
        payload: id
    })

    setTimeout(() => {
        $.get(`/api/article/${id}`)
            .done(response => dispatch({
                type: LOAD_ARTICLE_BY_ID + SUCCESS,
                response,
                payload: id
            }))
    }, 1000)
  }
}

/*
//optional HW
export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        payload: {},
        callAPI: '/api/article'
    }
}
*/
