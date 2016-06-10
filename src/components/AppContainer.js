import React, { Component, PropTypes } from 'react'
import stores  from '../stores'
import ArticleList from './ArticleList'
import storeSubscription from '../decorators/storeSubscription';

class AppContainer extends Component {
    render() {
        return <ArticleList articles = {this.props.articles} />
    }
}

export default storeSubscription(stores)(AppContainer)
