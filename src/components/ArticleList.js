import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import Article from './Article'
import Chart from './Chart'
import oneOpen from '../decorators/oneOpen'
import Select from 'react-select'
import DayPicker, { DateUtils } from 'react-day-picker'

import 'react-day-picker/lib/style.css'
import 'react-select/dist/react-select.css'
import 'react-day-picker/lib/style.css';

class ArticleList extends Component {

    state = {
        selected: [],
        from: null,
        to: null
    }

    componentDidMount() {
        console.log('---', 2)
        console.log('---', findDOMNode(this.refs.chart))
    }

    render() {
        const { articles, isOpen, openItem } = this.props
        const { from, to } = this.state

        const articleItems = this.getFilteredArticles().map((article) => <li key={article.id}>
            <Article article = {article}
                     isOpen = {isOpen(article.id)}
                openArticle = {openItem(article.id)}
            />
        </li>)

        const options = articles.map((article) => ({
            label: article.title,
            value: article.id
        }))

        return (
          <div>
              <ul>
                  {articleItems}
              </ul>
              <Chart ref="chart" />
              <DayPicker
                  ref="daypicker"
                  selectedDays={day => DateUtils.isDayInRange(day, {from, to})}
                  onDayClick={this.setDateRange.bind(this)}
              />
              <Select
                  options = {options}
                  onChange = {this.handleChange}
                  value= {this.state.selected}
                  multi = {true}
              />
          </div>
        )
    }

    getFilteredArticles() {
        const { articles } = this.props
        const { from, to, selected } = this.state
        return articles
            .filter((article) => !selected.length || selected.includes(article.id))
            .filter((article) => !(from || to) || DateUtils.isDayInRange(new Date(article.date), { from, to }))
    }

    setDateRange = (e, day) => {
        const range = DateUtils.addDayToRange(day, this.state)
        this.setState(range)
    }

    handleChange = (selected) => {
        this.setState({
            selected: selected.map(el => el.value)
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
