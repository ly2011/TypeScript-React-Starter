import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RouteProps, RouteComponentProps, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { Form, Input, Button, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

// 引入actions
import { LoginParams, doLogin } from '@/actions/user'

import SideBar from '@/components/SideBar'
import styles from './index.module.scss'

type LoginProps = RouteProps &
  RouteComponentProps &
  FormComponentProps & {
    loading: boolean
    accesstoken: string
    actions: {
      doLogin: (params: LoginParams) => void
    }
  }

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  }
}

class Login extends PureComponent<LoginProps> {
  validateAccessToken = (rule: Array<any>, value: string, callback: any) => {
    const form = this.props.form
    const accesstokenPattern = new RegExp('^[-0-9A-Za-z]{36}$')
    if (value && !accesstokenPattern.test(value)) {
      callback('您输入的accesstoken格式不正确')
    } else {
      callback()
    }
  }
  handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('接收到的值为: ', values)
        const { accesstoken } = values
        this.onLogin(accesstoken)
      }
    })
  }
  onLogin = async (accesstoken: string) => {
    const { history } = this.props
    const params = {
      accesstoken: accesstoken
    }
    try {
      const userInfo = await this.props.actions.doLogin(params)
      message.success('登录成功')
      // console.log('userInfo: ', userInfo)
      history.push('/')
    } catch (err) {
      message.error('登录失败')
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.props
    return (
      <section className={styles.container}>
        <div className="main">
          <SideBar />
          <div className="content">
            <div className="panel">
              <header className={`header ${styles.header}`} />
              <div className={`inner`}>
                <Form onSubmit={this.handleSubmit} className={styles.login_form}>
                  {/* <Form.Item {...formItemLayout} label="用户名">
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: '用户名不能为空' }]
                    })(<Input placeholder="" />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="密码">
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '密码不能为空' }]
                    })(<Input type="password" placeholder="" />)}
                  </Form.Item> */}
                  <Form.Item {...formItemLayout} label="accesstoken">
                    {getFieldDecorator('accesstoken', {
                      rules: [
                        { required: true, message: 'accesstoken不能为空' },
                        {
                          validator: this.validateAccessToken
                        }
                      ]
                    })(<Input placeholder="" maxLength={36} style={{ width: '270px' }} autoComplete="off" />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label=" ">
                    <Button type="primary" htmlType="submit" loading={loading} className={styles.login_form_button}>
                      登录
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
const WrappedLogin = Form.create()(Login)

const loginActions = { doLogin }
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    loading: state.user.loading,
    accesstoken: state.user.accesstoken
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedLogin)
)
// export default WrappedLogin
