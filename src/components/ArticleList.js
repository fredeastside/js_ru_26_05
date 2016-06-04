import React, { PropTypes, Component } from 'react'
import Article from './Article'
import toggleOpenList from '../decorators/toggleOpenList'

class ArticleList extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    render() {
        const { articles, openedId, toggleOpen } = this.props

        const articleItems = articles.map((article) => <li key={article.id}>
            <Article article = { article }
                     isOpen = { article.id === openedId }
                openArticle = { toggleOpen(article.id) }
            />
        </li>)

        return (
            <ul>
                { articleItems }
            </ul>
        )
    }
}

export default toggleOpenList(ArticleList)
