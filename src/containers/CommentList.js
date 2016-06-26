import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import { loadCommentsForArticle } from '../AC/comments'

class CommentListContainer extends Component {
  render() {
    this.props.loadCommentsForArticle(this.props.article)
    console.log(this.props);
    return (
      <CommentList article={ this.props.article } comments={ this.props.comments } />
    );
  }
}

export default connect(({ comments }) => ({ comments }), { loadCommentsForArticle })(CommentListContainer);
