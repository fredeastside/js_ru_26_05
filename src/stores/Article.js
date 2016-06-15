import BasicStore from './BasicStore'
import { DELETE_ARTICLE, FILTER_ARTICLES, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE_BY_ID, LOAD_COMMENTS_BY_ARTICLE_ID, START, SUCCESS, FAIL} from '../constants'

export default class ArticleStore extends BasicStore {
    constructor(...args) {
        super(...args)

        // можно ли так делать???
        this.filter = {
            selected: [],
            from: null,
            to: null
        };

        this._subscribe((action) => {
            const { type, payload, response, error } = action
            let article;

            switch (type) {
                case DELETE_ARTICLE:
                    this._delete(payload.id)
                    break

                case FILTER_ARTICLES:
                    // просто передаю фильтр как пропсы
                    // как тут отфильтровать сами данные так и не понял
                    // точнее я сделал, но после экшена терялся весь список (getAll возвращал уже отфильтрованный)
                    this.filter = Object.assign(this.filter, payload);
                    break;

                case ADD_COMMENT:
                    this._waitFor(['comments'])
                    article = this.getById(payload.articleId)
                    article.comments = (article.comments || []).concat(payload.comment.id)
                    break

                case LOAD_ALL_ARTICLES + START:
                    this.loading = true
                    break

                case LOAD_ALL_ARTICLES + SUCCESS:
                    response.forEach(this._add)
                    this.loading = false
                    break

                case LOAD_ALL_ARTICLES + FAIL:
                    this.error = error
                    this.loading = false
                    break

                case LOAD_ARTICLE_BY_ID + START:
                    this.getById(payload.id).loading = true
                    break

                case LOAD_ARTICLE_BY_ID + SUCCESS:
                    this._add(response)
                    break

                case LOAD_COMMENTS_BY_ARTICLE_ID + START:
                    this.getById(payload.id).commentsLoading = true
                    break

                case LOAD_COMMENTS_BY_ARTICLE_ID + SUCCESS:
                    article = this.getById(payload.id);
                    article.comments = response
                    //commentsLoaded и commentsLoading - нормально, а вот article.comments = response - плохо,
                    //мы договаривались держать комменты в отдельном сторе, а article.comments должно быть масивом id
                    
                    // это сделано чтобы понимать надо ли дергать api тк изначально comments не пустой
                    // и проверить на его длину не получится
                    // кривенько правда :(
                    article.commentsLoaded = true
                    article.commentsLoading = false
                    break

                case LOAD_COMMENTS_BY_ARTICLE_ID + FAIL:
                    this.getById(payload.id).commentsLoading = false
                    this.error = error
                    break

                default:
                    return
            }

            this._emitChange()
        })
    }
}
