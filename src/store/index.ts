import { Store, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from '../middleware'

import rootReducer from '../reducers'

export const history = createHistory()

const initialState = undefined

// export function configureStore(initialState?: any): Store<any> {
const middleware = routerMiddleware(history)
const middlewares = [thunk, middleware, logger]

const combineMiddlewares =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(rootReducer as any, initialState as any, combineMiddlewares) as Store<any>

export default store

//   return store
// }
