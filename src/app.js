import React from 'react'
import { render } from 'react-dom'
import AppContainer from './containers/AppContainer'
import store from './store'
import routes from './routes'

render(routes, document.getElementById('container'))
//render(<AppContainer store = {store} />, document.getElementById('container'))

/*
function wrappedIncrement(...args) {
    store.dispatch(increment(...args))
}

function renderComponent() {
    render(<AppContainer count = {store.getState().count} increment = {wrappedIncrement} />, document.getElementById('container'))
}

renderComponent()

store.subscribe(renderComponent)
*/
