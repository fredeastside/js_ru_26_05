import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import DayPicker, { DateUtils } from 'react-day-picker'
import {changeFilter} from '../AC/articles'
import 'react-day-picker/lib/style.css'
import 'react-select/dist/react-select.css'
import connectToStore from '../decorators/connectToStore'

class Filters extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        filters: PropTypes.object
    };

    render() {
        const { articles, filters } = this.props
        const {selected = [], date = {} } = filters
        const options = articles.map((article) => ({
            label: article.title,
            value: article.id
        }))

        return (
            <div>
                <DayPicker
                    ref="daypicker"
                    selectedDays={day => DateUtils.isDayInRange(day, date)}
                    onDayClick={this.setDateRange.bind(this)}
                />
                <Select
                    options = {options}
                    onChange = {this.handleChange}
                    value= {selected}
                    multi = {true}
                />
            </div>
        )
    }
    setDateRange = (e, day) => {
        const range = DateUtils.addDayToRange(day, this.props.filters.date || {})
        changeFilter('date', range)
    }

    handleChange = (selected) => {
        changeFilter('selected', selected.map(el => el.value))
    }
}

export default connectToStore(['articles'], (stores) => ({
    articles: stores.articles.getAll(),
    filters: stores.articles.getFilters()
}))(Filters)