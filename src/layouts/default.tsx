import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'
// import Loading from '../components/Loading'

import { childRoutes } from '../routes'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import BackTop from '../components/BackTop'

// const NavBar = Loadable({
//   loader: () => import(/* webpackChunkName: "NavBar" */ '../components/NavBar'),
//   loading: Loading
// })
// const Footer = Loadable({
//   loader: () => import(/* webpackChunkName: "Footer" */ '../components/Footer'),
//   loading: Loading
// })
// const BackTop = Loadable({
//   loader: () => import(/* webpackChunkName: "BackTop" */ '../components/BackTop'),
//   loading: Loading
// })

class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <NavBar />
        {childRoutes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        ))}
        <Footer />
        <BackTop />
      </div>
    )
  }
}

export default Layout
