import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import Counter from './Counter'
import ArticleList from './ArticleList'

class AppContainer extends Component {
    static propTypes = {
        store: PropTypes.object
    };

    render() {
        return (
            <Provider store = {this.props.store}>
                <div>
                    <Counter />
                    <ArticleList />
                </div>
            </Provider>
        )
    }
}

export default AppContainer