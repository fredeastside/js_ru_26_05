export default store => next => action => {
    const { withRandomId, ...rest } = action
    if (!withRandomId) return next(action)

    const randomId = Date.now()// + Math.random()
    next({...rest, randomId})
}
