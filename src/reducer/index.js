import { combineReducers } from 'redux'
import counterReducer from './counter'
import articles from './articles'
import comments from './comments'

export default combineReducers({
    count: counterReducer,
    articles,
    comments
})
