import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, SUCCESS, START, LOAD_COMMENTS_FOR_ARTICLE, LOAD_ARTICLE_BY_ID } from '../constants'
import { normalizedArticles } from '../fixtures'
import { fromArray } from '../store/utils'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    loading: false,
    isLoaded: false,
    entities: {}
})

export default (state = defaultState, action) => {
    const { type, payload, randomId, response, error } = action

    switch (type) {
        case LOAD_ALL_ARTICLES + START:
            return state.set('loading', true)
        case LOAD_ALL_ARTICLES + SUCCESS:
            return state
                .set('loading',false)
                .set('loaded', true)
                .set('entities', fromJS(fromArray(response)) )
//                .update('entities', entities => entities.merge(fromArray(response)))
        case LOAD_COMMENTS_FOR_ARTICLE + START:
            return state.setIn(['entities', payload.id, 'loadingComments'], true)
        case ADD_COMMENT:
          return state.setIn(
            ['entities', payload.articleId, 'comments'],
            state.getIn(['entities', payload.articleId, 'comments']).push(randomId)
          );
        case LOAD_ARTICLE_BY_ID + START:
          return state.setIn(['entities', payload, 'loading'], true)
        case LOAD_ARTICLE_BY_ID + SUCCESS:
          return state.setIn(['entities', payload, 'text'], response.text).setIn(['entities', payload, 'loading'], false)

/*
        case DELETE_ARTICLE: return articles.filter((article) => article.id != payload.id)
<<<<<<< HEAD
        case ADD_COMMENT:
            //это лишнее, .map и так вернет новый массив
          articles = [...articles];
          articles.map((article) => {
            if (article.id === payload.articleId) {
                //а это плохо, вы мутируете article
              article.comments.push(payload.id);
            }
          });
          return articles;
    }

    return articles
}
=======
        case ADD_COMMENT: return articles.map(article => article.id != payload.articleId ? article :
            {...article, comments: (article.comments || []).concat(randomId)}
        )
*/
    }

    return state
}
