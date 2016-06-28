import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_COMMENTS_FOR_ARTICLE, SUCCESS, START } from '../constants'
import { normalizedArticles } from '../fixtures'
import { fromArray } from '../store/utils'
import { fromJS, List, OrderedMap, Map } from 'immutable'

const defaultState = Map({
    entities: OrderedMap({}),
    loading: false
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

        case DELETE_ARTICLE: return state.deleteIn(['entities', payload.id])

        case ADD_COMMENT: return state.updateIn(['entities', payload.articleId, 'comments'],
            new List([]), comments => comments.push(randomId))

        case LOAD_COMMENTS_FOR_ARTICLE + START:
            return state.setIn(['entities', payload.id, 'loadingComments'], true)

        case LOAD_COMMENTS_FOR_ARTICLE + SUCCESS:
            return state.setIn(['entities', payload.id, 'loadingComments'], true)
                .setIn(['entities', payload.id, 'loadedComments'], true)

    }

    return state
}