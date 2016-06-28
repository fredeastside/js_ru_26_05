import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import store from '../store'

class AppContainer extends Component {
    state = {
        user: ''
    }
    static childContextTypes = {
        user: PropTypes.string
    }

    getChildContext() {
        return {
            user: this.state.user
        }
    }

    render() {
        return (
            <Provider store = {store}>
                <div>
                    <form onSubmit = {this.changeUser}>
                        username: <input value={this.state.user} onChange={this.handleChange}/>
                    </form>
                    {this.props.children}
                </div>
            </Provider>
        )
    }

    handleChange = (ev) => {
        this.setState({
            user: ev.target.value
        })
    }

    changeUser = (ev) => {
        ev.preventDefault()
    }
}

export default AppContainer
