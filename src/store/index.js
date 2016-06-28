import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import { normalizedComments } from '../fixtures'
import randomId from '../middlewares/randomId'
import callAPI from '../middlewares/callAPI'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const enhancer = compose(
    applyMiddleware(thunk, randomId, callAPI, createLogger()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(reducer, {}, enhancer)

window.store = store

export default store