import React, { Component, PropTypes } from 'react'
import { addComment } from '../AC/comments'
import { connect } from 'react-redux'

class NewCommentForm extends Component {
    static propTypes = {
        articleId: PropTypes.string.isRequired
    };

    static contextTypes = {
        user: PropTypes.string
    }

    state = {
        text: ''
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                new comment: <input value = {this.state.text} onChange = {this.handleChange('text')}/>
                <input type="submit" value="add comment" />
            </form>
        )
    }

    handleChange = input => ev => {
        this.setState({
            [input]: ev.target.value
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        const { addComment, articleId } = this.props
        addComment(articleId, {
            text: this.state.text,
            user: this.context.user
        })
        this.setState({
            text: ''
        })
    }

}

export default connect(null, { addComment })(NewCommentForm)