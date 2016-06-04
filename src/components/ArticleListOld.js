import React, { createClass } from 'react'
import Article from './Article'
import toggleOpenList from '../mixins/toggleOpenList'

const ArticleListOld = createClass({
  mixins: [toggleOpenList],
  propTypes: {
      articles: React.PropTypes.array.isRequired
  },

  render() {
      const { articles } = this.props

      const articleItems = articles.map((article) => <li key={article.id}>
          <Article article = {article}
                   isOpen = {article.id === this.state.openedId}
              openArticle = {this.toggleOpen(article.id)}
          />
      </li>)

      return (
          <ul>
              {articleItems}
          </ul>
      )
  }

});

export default ArticleListOld;
