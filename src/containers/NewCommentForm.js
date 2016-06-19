import React, { Component, PropTypes } from 'react'
import { addComment } from '../AC/comments'
import { connect } from 'react-redux';

class NewCommentForm extends Component {
    static propTypes = {
        articleId: PropTypes.string.isRequired
    };

    state = {
        text: '',
        user: ''

    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                new comment: <input value = {this.state.text} onChange = {this.handleChange('text')}/>
                user: <input value = {this.state.user} onChange = {this.handleChange('user')} />
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
        ev.preventDefault();
        if (this.state.text == '' && this.state.user == '') {
          return false;
        }
        this.props.addComment(this.props.articleId, this.state)
        this.setState({
            text: '',
            user: ''
        })
    }

}

export default connect(null, { addComment })(NewCommentForm)
