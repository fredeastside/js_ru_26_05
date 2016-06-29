import $ from 'jquery'
import { START, SUCCESS, FAIL } from '../constants'

export default store => next => action => {
    let { callAPI } = action;
    const { type, payload: { page, limit }, ...rest } = action
    if (!callAPI) return next(action)

    next({ ...rest, type: type + START })

    if (limit && page) {
      const offset = page * limit - limit;
      callAPI = `${callAPI}?limit=${limit}&offset=${offset}`
    }

    setTimeout(() => {
        $.get(callAPI)
            .done(response => next({...rest, type: type + SUCCESS, response}))
            .fail(error => next({...rest, type: type + FAIL, error}))
    }, 1000)
}
