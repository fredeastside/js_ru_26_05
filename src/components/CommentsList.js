import React, { Component, PropTypes } from 'react';
import Comment from './Comment';

class CommentsList extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false };

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  static propTypes = {
    comments: PropTypes.array
  };

  onClickHandler(event) {
    event.preventDefault();
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {

    const { isOpen } = this.state,
          { comments } = this.props,
          toggleText = isOpen ? 'Скрыть комментарии' : 'Показать комментарии';

    if (!comments || !comments.length) {
      return null;
    }

    const commentsItems = isOpen ? comments.map(comment => <Comment key={comment.id} comment={ comment } />) : null;

    return (
      <div>
        <a href="#" onClick={ this.onClickHandler }>{ toggleText }</a>
        { commentsItems }
      </div>
    );
  }
}

export default CommentsList;
