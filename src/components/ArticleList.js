import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import Article from './Article'
import Chart from './Chart'
import oneOpen from '../decorators/oneOpen'
import Select from 'react-select'
import DayPicker, { DateUtils } from "react-day-picker";
import moment from 'moment';

import 'react-select/dist/react-select.css'
import 'react-day-picker/lib/style.css';

class ArticleList extends Component {

    state = {
        selected: null,
        from: null,
        to: null
    }

    componentDidMount() {
        console.log('---', 2)
        console.log('---', findDOMNode(this.refs.chart))
    }

    render() {
        const { from, to, selected } = this.state;

        const options = this.props.articles.map((article) => ({
            label: article.title,
            value: article.id
        }))

        return (
            <div>
                <div>
                  <DayPicker
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                  />
                  <a href="#" onClick={ this.handleResetClick }>Сбросить фильтр</a>
                </div>
                { this.renderArticles() }
                <Chart ref="chart" />
                <Select
                    options = {options}
                    onChange = {this.handleChange}
                    value= { selected }
                    multi = {true}
                />
            </div>
        )
    }

    renderArticles() {
        const { articles, isOpen, openItem } = this.props;
        const { from } = this.state;
        let notFound = true;

        const articleItems = articles.map((article) => {

          if (!this.isFilteredByDate(article.created_at)) {
            return null;
          }

          notFound = false;

          return (
            <li key={article.id}>
                <Article article = {article}
                         isOpen = {isOpen(article.id)}
                    openArticle = {openItem(article.id)}
                />
            </li>
          )
        });

        return (
          <ul>
              { from && notFound ? <li><strong>On your terms nothing has been found.</strong></li> : articleItems }
          </ul>
        );
    }

    isFilteredByDate = (timestamp) => {
      const { from, to } = this.state;

      timestamp = moment.unix(timestamp);

      if (!from) {
          return true;
      }

      if (to) {
        if (timestamp >= moment(from).startOf('day') && timestamp <= moment(to).endOf('day')) {
          return true;
        }
      }

      if (timestamp >= moment(from).startOf('day') && timestamp <= moment(from).endOf('day')) {
        return true;
      }

      return false;
    }

    handleChange = (selected) => {
        this.setState({
            selected
        })
    }

    handleDayClick = (e, day) => {
      let { from, to } = DateUtils.addDayToRange(day, this.state);
      this.setState({ from, to });
    }

    handleResetClick = (e) => {
      e.preventDefault();
      this.setState({
        from: null,
        to: null,
      });
    }
}

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    isOpen: PropTypes.func.isRequired,
    openItem: PropTypes.func.isRequired
}

export default oneOpen(ArticleList)
