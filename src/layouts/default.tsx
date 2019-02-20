import React from 'react'
import { Route } from 'react-router'

import NavBar from '../components/NavBar'
import FooterBottom from '../components/Footer'
import BackTop from '../components/BackTop'

import { childRoutes } from '../routes'

class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <NavBar />
        {childRoutes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        ))}
        <FooterBottom />
        <BackTop />
      </div>
    )
  }
}

export default Layout
