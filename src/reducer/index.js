import { combineReducers } from 'redux'
import counterReducer from './counter'
import articlesReducer from './articles'
import comments from './comments'

export default combineReducers({
    count: counterReducer,
    articles: articlesReducer,
    comments
})