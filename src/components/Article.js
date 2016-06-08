import React, { PropTypes, Component } from 'react'
import CommentList from './CommentList'
import moment from 'moment';

class Article extends Component {

/*
    shouldComponentUpdate(nextProps, nextState) {
        //pseudo code
        //nextProps.article.text === this.props.article.text
        return nextProps.article != this.props.article || this.props.isOpen != nextProps.isOpen
    }

*/
    render() {
        const { article, openArticle } = this.props
        if (!article) return <h3>No article</h3>

        return (
            <div>
                <h3 onClick = {openArticle}>{article.title} ({ moment.unix(article.created_at).format("DD.MM.YYYY") })</h3>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article, isOpen } = this.props
        if (!isOpen) return null
        return (
            <section>
                {article.text}
                <CommentList comments = {article.comments} />
            </section>
        )
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
