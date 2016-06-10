import AppDispatcher from '../dispatcher'
import { EventEmitter } from 'events'
import DataWrapper from './DataWrapper'
const SOME_CHANGE_EVENT = 'SOME_CHANGE_EVENT'

export default class BasicStore extends EventEmitter {
    constructor(stores, initialState = []) {
        super()
        this._stores = stores
        this._items = {}
        initialState.forEach(this._add)
    }

    _subscribe = (callback) => {
        AppDispatcher.register(callback)
    }

    getAll = () => {
        return Object.keys(this._items).map(this.getById)
    }

    getById = (id) => {
        return this._items[id]
    }

    getStoreByName(name) {
        return this._stores[name]
    }

    _add = (item) => {
        this._items[item.id] = new DataWrapper(item, this)
    }

    _delete = (id) => {
        delete this._items[id]
    }

    _emitChange = () => {
        this.emit(SOME_CHANGE_EVENT)
    }

    addChangeListener = (callback) => {
        this.on(SOME_CHANGE_EVENT, callback)
    }

    removeChangeListener = (callback) => {
        this.removeListener(SOME_CHANGE_EVENT, callback)
    }
}