import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, LOAD_ALL_COMMENTS, SUCCESS, START, FAIL } from '../constants'
import { normalizedComments } from '../fixtures'
import { fromArray } from '../store/utils'
import { fromJS, Map, OrderedMap } from 'immutable'

const defaultState = Map({
    entities: OrderedMap({}),
    loading: false,
    loadingAll: false,
    total: 0,
    limit: 4
})

export default (comments = defaultState, action) => {
    const { type, payload, randomId, response, error } = action

    switch (type) {
        case ADD_COMMENT:
            return comments.setIn(['entities', randomId.toString()], fromJS({...payload.comment, id: randomId}))

        case LOAD_COMMENTS_FOR_ARTICLE + SUCCESS:
            return comments.update('entities', entities => entities.merge(fromJS(fromArray(response))))
        case LOAD_ALL_COMMENTS + START:
            return comments.set('loadingAll', true)
        case LOAD_ALL_COMMENTS + SUCCESS:
            return comments
                    .set('loadingAll', false)
                    .set('total', response.total)
                    .set('entities', fromJS(fromArray(response.records)))
    }

    return comments
}
