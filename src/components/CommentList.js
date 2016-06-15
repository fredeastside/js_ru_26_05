import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import { loadCommentsByArticleId } from '../AC/comments'

//хорошо, но я бы уже передавал просто article, а не отдельно articleId и comments
class CommentList extends Component {
    static defaultProps = {

    }

    static propTypes = {
        article: PropTypes.object.isRequired,
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    render() {
        return (
            <div>
                {this.getToggler()}
                {this.getList()}
            </div>
        )
    }



    componentWillUpdate(nextProps) {
        //console.log(this.props.isOpen, ' changes to ', nextProps.isOpen)
        const { article } = this.props;
        if (!this.props.isOpen && nextProps.isOpen
            && !article.commentsLoading
            && !article.commentsLoaded) {
            loadCommentsByArticleId(article)
        }
    }


    getToggler() {
        const { isOpen, toggleOpen } = this.props
        const text = isOpen ? 'hide comments' : 'show comments'
        return <a href = "#" onClick = {toggleOpen}>{text}</a>
    }

    getList() {
        const { article, isOpen } = this.props
        const { comments, commentsLoading } = article
        if (!isOpen) return null
        if (commentsLoading) return <h3>Loading...</h3>
        if (!comments || !comments.length) return <h3>No comments yet</h3>
        const items = comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)
        return <div>
            <ul>{items}</ul>
            <NewCommentForm articleId={article.id} />
        </div>
    }
}

export default toggleOpen(CommentList)
