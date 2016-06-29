import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router';

class Pagination extends Component {

  onClickHandler(page) {
    this.props.changePage(page);
  }

  renderPagination(c, m) {
      var current = c,
          last = m,
          delta = 2,
          left = current - delta,
          right = current + delta + 1,
          range = [],
          rangeWithDots = [],
          l;

      for (let i = 1; i <= last; i++) {
          if (i == 1 || i == last || i >= left && i < right) {
              range.push(i);
          }
      }

      for (let i of range) {
          if (l) {
              if (i - l === 2) {
                  rangeWithDots.push(this.renderPaginationPage(l + 1));
              } else if (i - l !== 1) {
                  rangeWithDots.push(<div key={ shortid.generate() }>...</div>);
              }
          }

          rangeWithDots.push(this.renderPaginationPage(i));
          l = i;
      }

      return rangeWithDots;
  }

  renderPaginationPage(number) {
    return (
      <li key={ shortid.generate() }>
          <Link to={`/comments/${number}`}>
              { number }
          </Link>
      </li>
    );
  }

  render() {
    if (this.props.totalPages <= 1) return null;

    return (
      <ul>
        { this.renderPagination(this.props.currentPage, this.props.totalPages) }
      </ul>
    );
  }

}

export default Pagination;
