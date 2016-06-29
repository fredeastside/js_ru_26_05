import React, { Component } from 'react';
import Pagination from '../components/Pagination';
import Comment from '../components/Comment';
import { connect } from 'react-redux';
import { loadAllComments } from '../AC/comments';

class AllCommentList extends Component {

  componentDidMount() {
    const page = this.props.params.page;
    this.loadComments(page);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.page != nextProps.params.page) {
      this.loadComments(nextProps.params.page);
    }
  }

  loadComments(page) {
    const limit = this.props.comments.get('limit');
    this.props.loadAllComments(page, limit);
  }

  render() {
    const comments = this.props.comments.get('entities');

    if (this.props.comments.get('loadingAll')) return <h3>Loading...</h3>

    if (!comments || !comments.size) return <h3>No comments yet</h3>

    const items = comments.map(comment => <li key = {comment.get('id')}><Comment comment = {comment} /></li>);
    const total = this.props.comments.get('total'),
          page = this.props.params.page,
          limit = this.props.comments.get('limit'),
          totalPages = Math.ceil(total / limit);

    return (
      <div>
          <div>{ items }</div>
          <Pagination currentPage={ page } totalPages={ totalPages } />
      </div>
    );
  }
}

export default connect(({ comments }) => {
  return { comments }
}, { loadAllComments })(AllCommentList);
