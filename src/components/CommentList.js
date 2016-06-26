import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from '../containers/NewCommentForm'
import { loadCommentsForArticle } from '../AC/comments'
import { getRelation } from '../store/utils'
import { connect } from 'react-redux';

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

    componentWillReceiveProps({ isOpen, article }) {
        if (isOpen && !article.loadingComments && getRelation(article, 'comments').includes(undefined)) {
          this.props.loadCommentsForArticle(article)
        }
    }

    render() {
        return (
            <div>
                {this.getToggler()}
                {this.getList()}
            </div>
        )
    }

    getToggler() {
        const { isOpen, toggleOpen } = this.props
        const text = isOpen ? 'hide comments' : 'show comments'
        return <a href = "#" onClick = {toggleOpen}>{text}</a>
    }

    getList() {
        const { article, isOpen } = this.props
        if (!isOpen) return null
        const comments = getRelation(article, 'comments')
        if (!comments || !comments.length) return <h3>No comments yet</h3>
        if (comments.includes(undefined)) return <h3>Loading comments...</h3>
        const items = comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)
        return <div>
            <ul>{items}</ul>
            <NewCommentForm articleId={article.id} />
        </div>
    }
}

export default connect(null, { loadCommentsForArticle })(toggleOpen(CommentList));
//export default toggleOpen(CommentList)
