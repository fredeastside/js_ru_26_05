import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';

class CommentListContainer extends Component {
  render() {
    return (
      <CommentList article={ this.props.article } comments={ this.props.comments } />
    );
  }
}

export default connect(({ comments }) => ({ comments }))(CommentListContainer);
