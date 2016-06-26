import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, START, SUCCESS } from '../constants'
import { toArray, fromArray } from '../store/utils'
import { fromJS, toMap } from 'immutable'

const defaultState = fromJS({
    loading: false,
    isLoaded: false,
    entities: {}//fromArray(normalizedComments)
})

export default (state = defaultState, action) => {
    const { type, payload, randomId, response, error } = action
    let comments
    switch (type) {
        case LOAD_COMMENTS_FOR_ARTICLE + START:
            return state.set('loading', true)
        case LOAD_COMMENTS_FOR_ARTICLE + SUCCESS:
            comments = toArray(state.get('entities').toJS());
            comments = comments.concat(response);
            return state
                .set('loading',false)
                .set('loaded', true)
                //вы так будете каждый раз перезаписывать комменты. Лучше мерджить fromJS(fromArray(comments)) в entities
                .set('entities', fromJS(fromArray(comments)) )
        case ADD_COMMENT:
          comments = toArray(state.get('entities').toJS());
          comments.push({...payload.comment, id: randomId});
          return state.set(
            'entities',
            fromJS(fromArray(comments))
          );
    }

    return state
}
