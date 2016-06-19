import { INCREMENT } from '../constants'

export default (count = 0, action) => {
    const { type, payload } = action
    return type == INCREMENT ? count + 1 : count
}
