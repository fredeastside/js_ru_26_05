export default store => next => action => {
    console.log('before action', store.getState())
    console.log('dispatching', action)
    next(action)
    console.log('after', store.getState())
}