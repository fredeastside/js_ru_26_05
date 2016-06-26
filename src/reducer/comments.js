import { ADD_COMMENT } from '../constants'
import { normalizedComments } from '../fixtures'
import { fromArray } from '../store/utils'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    loading: false,
    isLoaded: false,
    entities: fromArray(normalizedComments)
})

export default (comments = defaultState, action) => {
    const { type, payload, randomId, response, error } = action

    switch (type) {
//        case ADD_COMMENT: return comments.concat({...payload.comment, id: randomId})
    }

    return comments
}
