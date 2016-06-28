import React, { PropTypes, createClass } from 'react'
import Article from './Article'
import oneOpen from '../mixins/oneOpen'

const ArticleListOld = createClass({
    propTypes: {
        articles: PropTypes.array.isRequired
    },
    mixins: [oneOpen],
    render() {
        const { articles } = this.props
        const articleItems = articles.map((article) => <li key={article.id}>
            <Article article = {article}
                isOpen = {this.isOpen(article.id)}
                toggleOpen = {this.openItem(article.id)}
            />
        </li>)
        return (
            <div>
                <ul>
                    {articleItems}
                </ul>
            </div>
        )
    }
})

export default ArticleListOld