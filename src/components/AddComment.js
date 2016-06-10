import React, { Component, PropTypes } from 'react';
import { addComment } from '../AC/comments'

class AddComment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      text: ''
    }
  }

  static propTypes = {
    articleId: PropTypes.string.isRequired
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    const { name, text } = this.state;

    if (!name || !text) {
      return;
    }

    addComment(this.props.articleId, name, text);
    this.setState({ name: '', text: '' })
  }

  onChangeNameHandler = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value })
  }

  onChangeTextHandler = (e) => {
    e.preventDefault();
    this.setState({ text: e.target.value })
  }

  render() {
    return (
      <div>
        <p>Add comment</p>
        <form onSubmit={ this.onSubmitHandler }>
            <p>
              <label>Name: <input type="text" value={ this.state.name } onChange={ this.onChangeNameHandler } /></label>
            </p>
            <p>
              <label>Text: <textarea type="text" value={ this.state.text } onChange={ this.onChangeTextHandler } /></label>
            </p>
            <p><input type="submit" value="Add" /></p>
        </form>
      </div>
    );
  }
}

export default AddComment;
