import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleList'
import connectToStore from '../decorators/connectToStore'
import { loadAllArticles } from '../AC/articles'

class AppContainer extends Component {

    componentDidMount() {
        loadAllArticles()
    }

    render() {
        const { loading, articles, filter } = this.props
        if (loading) return <h1>Loading...</h1>
        return <ArticleList articles = {articles} filter={ filter } />
    }
}


function getState(stores) {
    const { articles } = stores

    return {
        articles: articles.getAll(),
        loading: articles.loading,
        filter: articles.filter
    }
}

export default connectToStore(null, getState)(AppContainer)
