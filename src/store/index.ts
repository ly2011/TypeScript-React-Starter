import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers'

export const history = createHistory()
const middleware = routerMiddleware(history)
const middlewares = [thunk, middleware]

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
  // composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
