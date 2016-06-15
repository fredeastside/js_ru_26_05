import Article from './Article'
import Comment from './Comment'
import BasicStore from './BasicStore'

import {normalizedArticles, normalizedComments} from '../fixtures'

const stores = {}
Object.assign(stores, {
    articles: new Article(stores),
    comments: new Comment(stores)
})

export default stores
export const articleStore = stores.articles
export const commentStore = stores.comments

window.stores = stores
