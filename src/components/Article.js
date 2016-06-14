import React, { PropTypes, Component } from 'react'
import CommentList from './CommentList'
import { deleteArticle, loadArticleById } from '../AC/articles'

class Article extends Component {

/*
    shouldComponentUpdate(nextProps, nextState) {
        //pseudo code
        //nextProps.article.text === this.props.article.text
        return nextProps.article != this.props.article || this.props.isOpen != nextProps.isOpen
    }

*/

    componentWillReceiveProps({ isOpen, article : { id, text, loading } }) {
        if (isOpen && !text && !loading) loadArticleById({ id })
    }

    render() {
        const { article, openArticle } = this.props
        if (!article) return <h3>No article</h3>

        return (
            <div>
                <h3 onClick = {openArticle}>{article.title} <a href="#" onClick = {this.handleDeleteArticle}>delete article</a></h3>
                <h6>Added {new Date(article.date).toDateString()}</h6>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article, isOpen } = this.props
        if (!isOpen) return null
        const loader = article.loading ? <h3>Loading...</h3> : null

        return (
            <section>
                {loader}
                {article.text}
                <CommentList article = { article} />
            </section>
        )
    }

    handleDeleteArticle = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        deleteArticle(this.props.article.id)
    }
}

Article.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string,
        id: PropTypes.string.isRequired
    }),
    isOpen: PropTypes.bool,
    openArticle: PropTypes.func,
    options: PropTypes.object
}

export default Article
