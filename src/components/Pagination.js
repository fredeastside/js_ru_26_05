import React, { Component } from 'react';
import shortid from 'shortid';

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
                  rangeWithDots.push(
                    this.renderPaginationPage(l + 1, this.getPageClass(!!((l + 1) == current)))
                  );
              } else if (i - l !== 1) {
                  rangeWithDots.push(<div key={ shortid.generate() }>...</div>);
              }
          }

          rangeWithDots.push(this.renderPaginationPage(i, this.getPageClass(!!(i == current))));
          l = i;
      }

      return rangeWithDots;
  }

  renderPaginationPage(number, classNameValue) {
    return (
      <div onClick={ () => this.onClickHandler(number) } className={ classNameValue } key={ shortid.generate() }>
          { number }
      </div>
    );
  }

  getPageClass(isActive) {
    return isActive ? "active" : "";
  }

  render() {
    if (this.props.totalPages <= 1) return null;

    return (
      <div>
        { this.renderPagination(this.props.currentPage, this.props.totalPages) }
      </div>
    );
  }

}

export default Pagination;
