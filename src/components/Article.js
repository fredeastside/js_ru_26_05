import React, { PropTypes, Component } from 'react'
import {connect } from 'react-redux'
import CommentList from './../containers/CommentList'
import { deleteArticle } from '../AC/articles'

class Article extends Component {

/*
    shouldComponentUpdate(nextProps, nextState) {
        //pseudo code
        //nextProps.article.text === this.props.article.text
        return nextProps.article != this.props.article || this.props.isOpen != nextProps.isOpen
    }

*/

/*
    componentWillReceiveProps({ isOpen, article : { id, text, loading } }) {
        if (isOpen && !text && !loading) loadArticleById({ id })
    }
*/

    render() {
        const { article, openArticle } = this.props
        if (!article) return <h3>No article</h3>

        return (
            <div>
                <h3 onClick = {openArticle}>{article.get('title')}
                    <a href="#" onClick = {this.handleDeleteArticle}>delete article</a>
                </h3>
                <h6>Added {new Date(article.get('date')).toDateString()}</h6>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article, isOpen } = this.props
        if (!isOpen) return null
        const loader = article.get('loading') ? <h3>Loading...</h3> : null
        return (
            <section>
                {loader}
                {article.get('text')}
                <CommentList article = { article} />
            </section>
        )
    }

    handleDeleteArticle = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        this.props.deleteArticle(this.props.article.get('id'))
    }
}

Article.propTypes = {
    article: PropTypes.object,
    isOpen: PropTypes.bool,
    openArticle: PropTypes.func,
    options: PropTypes.object
}

export default connect(null, { deleteArticle })(Article)