import { combineReducers } from 'redux'
import counterReducer from './counter'
import articlesReducer from './articles'
import commentsReducer from './comments'

export default combineReducers({
    count: counterReducer,
    articles: articlesReducer,
    comments: commentsReducer
})
