import React, { Component, PropTypes } from 'react';

class Comment extends Component {

  static propTypes = {
    comment: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  };

  render() {
    const { comment } = this.props;
    return (
      <div>
        <p><strong>{ comment.name }</strong></p>
        <p>{ comment.text }</p>
      </div>
    );
  }

}

export default Comment;
