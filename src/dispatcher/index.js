import { Dispatcher } from 'flux'

const AppDispatcher  = new Dispatcher

//for dev only
AppDispatcher.register(console.log.bind(console))

export default AppDispatcher