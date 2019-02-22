import React from 'react'
import { Link } from 'react-router-dom'

import { Form, Input, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { navBars } from '@/utils/nav-bars'
import Logo from '@/assets/img/cnodejs_light.svg'

import styles from './index.module.scss'

const FormItem = Form.Item

interface NavBarProps extends FormComponentProps {
  [key: string]: any
  router: any
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
  accesstoken: boolean
}
class NavBar extends React.Component<NavBarProps, NavBarState> {
  state = {
    navBarList: [],
    accesstoken: false
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
      if (this.state.accesstoken) {
        nav.show = !needDeleteWhenLogin.includes(nav.name)
      } else {
        nav.show = !needDeleteWhenNotLogin.includes(nav.name)
      }
      return nav
    })

    return newNavBars
  }
  componentDidMount() {
    this.setState({
      navBarList: this.computedNavBarList()
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { navBarList } = this.state
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
                  {getFieldDecorator('q', {
                    // rules: [{required: true, message: ''}]
                  })(<Input prefix={<Icon type="search" />} placeholder="请输入内容" />)}
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
export default WrappedNavBar
