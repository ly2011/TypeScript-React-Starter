import React, { Component } from 'react'
import { Router } from 'react-router-dom'

// import createHistory from 'history/createBrowserHistory'
// import { composeWithDevTools } from 'redux-devtools-extension';
// const middleware = routerMiddleware(history);
import routes from './routes'
import { history } from './store'

// const history = createHistory()
class App extends Component {
  render() {
    return <Router history={history}>{routes}</Router>
  }
}

export default App
