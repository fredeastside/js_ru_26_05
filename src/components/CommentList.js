import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import toggleOpen from '../decorators/toggleOpen'

class CommentList extends Component {
    static defaultProps = {

    }

    static propTypes = {
        comments: PropTypes.array,
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };
    render() {
        return (
            <div>
                {this.getToggler()}
                {this.getList()}
                <AddComment articleId={ this.props.articleId } />
            </div>
        )
    }

    componentDidMount() {
        console.log('I am mounted')
    }

    componentWillUpdate(nextProps) {
        console.log(this.props.isOpen, ' changes to ', nextProps.isOpen)
    }


    getToggler() {
        const { isOpen, toggleOpen } = this.props
        const text = isOpen ? 'hide comments' : 'show comments'
        return <a href = "#" onClick = {toggleOpen}>{text}</a>
    }

    getList() {
        const { comments, isOpen } = this.props
        if (!isOpen) return null
        if (!comments || !comments.length) return <h3>No comments yet</h3>
        const items = comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)
        return <ul>{items}</ul>
    }
}

export default toggleOpen(CommentList)
