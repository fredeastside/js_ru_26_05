import React, { Component, PropTypes } from 'react'
import ArticleList from '../components/ArticleList'
import { connect } from 'react-redux'
import { toArray } from '../store/utils'
import { loadAllArticles } from '../AC/articles'

class ArticleListContainer extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.loadAllArticles()
    }

    render() {
        const { articles, loading } = this.props
        if (loading) return <h3>Loading...</h3>
        return (
            <ArticleList articles = {this.props.articles} />
        )
    }
}

export default connect(state => ({
    articles: toArray(state.articles.get('entities').toJS()),
    loading: state.articles.get('loading'),
    loaded: state.articles.get('loaded')
}), { loadAllArticles })(ArticleListContainer)