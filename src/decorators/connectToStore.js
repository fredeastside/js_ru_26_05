import React, { Component as ReactComponent} from 'react'
import stores from '../stores'

export default (storeNames, getStateFromStores) => {
    storeNames = storeNames || Object.keys(stores)
    return (Component) => class ConnectToStore extends ReactComponent {
        constructor(props) {
            super(props)
            this.state = getStateFromStores(stores, props)
        }

        componentWillReceiveProps(props) {
            this.setState(getStateFromStores(stores, props))
        }

        /**
         Проблема с отсутствие лоадера была в плохом выборе мной lifecycle-хука в декораторе:
         я подписывался на сторы в componentDidMount.
         Но дальше сразу делал loadAllArticles в componentDidMount дочернего компонента.
         LOAD_ALL_ARTICLES_START проходило по синхронному циклу.
         А вы помните, что дочерний componentDidMount вызывается раньше чем родительский?
         Таким образом у нас LOAD_ALL_ARTICLES_START обрабатывался еще до того,
         как мы подписались на сторы. Лечиться заменой в декораторе componentDidMount на componentWillMount         *
         */

        componentWillMount = () => {
            storeNames
                .map(name => stores[name])
                .forEach(store =>
                    store.addChangeListener(this.handleStoresChanged)
                )
        }

        componentWillUnmount = () => {
            storeNames
                .map(name => stores[name])
                .forEach(store =>
                    store.removeChangeListener(this.handleStoresChanged)
                )
        }

        handleStoresChanged = () => {
            console.log('---', 123, 'changing')
            this.setState(getStateFromStores(stores, this.props));
        }

        render() {
            return <Component {...this.props} {...this.state}/>
        }
    }
}
