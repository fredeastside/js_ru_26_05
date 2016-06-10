import BasicStore from './BasicStore'
import { ADD_COMMENT } from '../constants'

export default class CommentStore extends BasicStore {
    constructor(...args) {
        super(...args)
        this._subscribe((action) => {
            const { type, payload } = action

            switch (type) {
                case ADD_COMMENT:
                    const { name, text } = payload;
                    this._add({
                      id: this.getIdForNewComment(),
                      name: name,
                      text: text
                    });
                    break

                default:
                    return
            }

            this._emitChange()
        });
    }

    getIdForNewComment() {
      return this.getAll().length;
    }
}
