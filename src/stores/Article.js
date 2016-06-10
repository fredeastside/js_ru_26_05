import BasicStore from './BasicStore'
import { DELETE_ARTICLE, ADD_COMMENT } from '../constants'

export default class ArticleStore extends BasicStore {
    constructor(...args) {
        super(...args)
        this._subscribe((action) => {
            const { type, payload } = action

            switch (type) {
                case DELETE_ARTICLE:
                    this._delete(payload.id)
                    break
                case ADD_COMMENT:
                    this._addComment(payload);
                    break;

                default:
                    return
            }

            this._emitChange()
        })
    }

    _addComment = ({ articleId, id }) => {
      let article = this.getById(articleId);

      article.comments.push(id);
    }
}
