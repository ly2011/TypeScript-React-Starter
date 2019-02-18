import React, { Component } from 'react'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
// import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css'
// const middleware = routerMiddleware(history);
import routes from './routes'

const history = createHistory()
class App extends Component {
  render() {
    return <Router history={history}>{routes}</Router>
  }
}

export default App
