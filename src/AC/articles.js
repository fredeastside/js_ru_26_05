import AppDispatcher from '../dispatcher'
import { loadAllArticlesCall, loadArticleByIdCall, asyncACFactory } from './webUtils'
import { DELETE_ARTICLE, FILTER_ARTICLES, LOAD_ARTICLE_BY_ID, LOAD_ALL_ARTICLES } from '../constants'

export function deleteArticle(id) {
    const action = {
        type: DELETE_ARTICLE,
        payload: { id }
    }

    AppDispatcher.dispatch(action)
}

export function filterArticles(filter) {
    AppDispatcher.dispatch({
        type: FILTER_ARTICLES,
        payload: filter
    });
}

export const loadAllArticles = asyncACFactory(loadAllArticlesCall, LOAD_ALL_ARTICLES)
export const loadArticleById = asyncACFactory(loadArticleByIdCall, LOAD_ARTICLE_BY_ID)
