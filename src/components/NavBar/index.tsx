import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, RouteProps, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import { Form, Input, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { navBars } from '@/utils/nav-bars'
import Logo from '@/assets/img/cnodejs_light.svg'

import styles from './index.module.scss'

const FormItem = Form.Item

// interface NavBarProps extends FormComponentProps {
//   [key: string]: any
//   router: any
// }
type NavBarProps = RouteProps &
  RouteComponentProps &
  FormComponentProps & {
    accesstoken: string
  }
interface navBarItem {
  name: string
  path: string
  title: string
  exact: boolean
  show: boolean
}
interface NavBarState {
  navBarList: Array<navBarItem>
}
class NavBar extends PureComponent<NavBarProps, NavBarState> {
  state = {
    navBarList: []
  }
  handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('接收到的值为: ', values)
        window.location.href = `https://www.google.com.hk/#hl=zh-CN&q=site:cnodejs.org+${values.q}`
      }
    })
  }
  computedNavBarList() {
    const tmpNavBars = JSON.parse(JSON.stringify(navBars))
    const needDeleteWhenLogin = ['register', 'login']
    const needDeleteWhenNotLogin = ['my-messages', 'logout']

    const newNavBars = tmpNavBars.map((nav: navBarItem) => {
      if (this.props.accesstoken) {
        nav.show = !needDeleteWhenLogin.includes(nav.name)
      } else {
        nav.show = !needDeleteWhenNotLogin.includes(nav.name)
      }
      return nav
    })

    return newNavBars
  }
  componentWillReceiveProps(nextProps: NavBarProps) {
    // console.log('NavBar - mounted: ', this.props.accesstoken, this.computedNavBarList())
    this.setState({
      navBarList: this.computedNavBarList()
    })
  }
  componentDidMount() {
    this.setState({
      navBarList: this.computedNavBarList()
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { navBarList } = this.state
    // console.log('navBarList: ', navBarList)
    return (
      <div className={styles.navbar}>
        <div className={styles['navbar-inner']}>
          <div className={styles['navbar-container']}>
            <div className={styles.logo}>
              <Link to="/" className={styles.brand}>
                <img src={Logo} alt="cnodejs" />
              </Link>
              <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('q', {})(<Input prefix={<Icon type="search" />} placeholder="请输入内容" />)}
                </FormItem>
              </Form>
            </div>

            <ul className={styles.nav}>
              {navBarList.map((nav: navBarItem) => {
                if (nav.show) {
                  return (
                    <li key={nav.name || nav.path}>
                      <Link to={{ pathname: nav.path }}>{nav.title}</Link>
                    </li>
                  )
                }
                return null
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedNavBar = Form.create()(NavBar)
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    accesstoken: state.user.accesstoken
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
  return {}
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedNavBar)
)
// export default withRouter(WrappedNavBar)
