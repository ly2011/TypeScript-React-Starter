import React from 'react'
import { Route } from 'react-router'

import { childRoutes } from '../routes'

class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        {childRoutes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        ))}
      </div>
    )
  }
}

export default Layout
