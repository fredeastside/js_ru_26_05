import React, { Component } from 'react';
import Pagination from '../components/Pagination';
import { connect } from 'react-redux';
import { loadAllComments } from '../AC/comments';

class AllCommentList extends Component {

  componentDidMount() {
    this.props.loadAllComments();
  }

  render() {

    console.log(this.props.comments.get('entities'));

    return (
      <div>Comments</div>
    );
  }
}

export default connect(({ comments }) => {
  return { comments }
}, { loadAllComments })(AllCommentList);
