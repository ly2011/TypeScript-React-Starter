import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, RouteProps, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import { Button } from 'antd'
import styles from './index.module.scss'

type SideBarProps = RouteProps &
  RouteComponentProps & {
    accesstoken: string
    userInfo: any
  }
class SideBar extends PureComponent<SideBarProps> {
  toLogin = () => {
    this.props.history.push('/login')
  }
  toUserInfo = () => {
    this.props.history.push('/user')
  }
  toCreateTopic = () => {
    this.props.history.push('/topic/create')
  }
  render() {
    const { userInfo } = this.props
    return (
      <aside className={`${styles.sidebar} sidebar`}>
        {!this.props.accesstoken && (
          <div className="panel">
            <div className="inner">
              <p>CNode：Node.js专业中文社区</p>
              <div className={styles.box_card_content}>
                <div className={styles.login_info}>
                  您可以&nbsp;
                  <Link to="/login">登录</Link>&nbsp;或&nbsp;<Link to="/register">登录</Link>
                  &nbsp;，也可以
                  <Button type="primary" onClick={this.toLogin}>
                    通过 Github 登录
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.props.accesstoken && (
          <div className="panel">
            <div className="inner">
              <p>个人信息</p>
              <div className={styles.box_card_content}>
                <div className={styles.login_info}>
                  <a href="javascript:;" className={styles.user_avatar} onClick={this.toUserInfo}>
                    <img src={userInfo.avatar_url} title={userInfo.loginname} />
                  </a>
                  <span className={styles.user_name}>
                    <a href="javascript:;" className="dark" onClick={this.toUserInfo}>
                      {userInfo.loginname}
                    </a>
                  </span>
                </div>
                <div className={styles.board}>
                  <span className="big">积分: {userInfo.score}</span>
                </div>
                <div className={styles.bottom}>
                  <span className={styles.signature}>“ 这家伙很懒，什么个性签名都没有留下。 ”</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.props.accesstoken && (
          <div className="panel">
            <div className="inner">
              <div className={styles.box_card_content}>
                <div className={styles.login_info}>
                  <Button type="primary" onClick={this.toCreateTopic}>
                    发布话题
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!this.props.accesstoken && (
          <div className="panel">
            <div className="inner">
              <p>友情社区</p>
              <div className={styles.box_card_content}>
                <ol className={styles.friendship_community}>
                  <li>
                    <a href="https://ruby-china.org/" target="_blank">
                      <img src="//static2.cnodejs.org/public/images/ruby-china-20150529.png" />
                    </a>
                  </li>
                  <div className="sep10" />
                  <li>
                    <a href="http://golangtc.com/" target="_blank">
                      <img src="//static2.cnodejs.org/public/images/golangtc-logo.png" />
                    </a>
                  </li>
                  <div className="sep10" />
                  <li>
                    <a href="http://phphub.org/" target="_blank">
                      <img src="//static2.cnodejs.org/public/images/phphub-logo.png" />
                    </a>
                  </li>
                  <div className="sep10" />
                  <li>
                    <a href="https://testerhome.com/" target="_blank">
                      <img src="//static.cnodejs.org/FjLUc7IJ2--DqS706etPQ1EGajxK" />
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {!this.props.accesstoken && (
          <div className="panel">
            <div className="inner">
              <p>客户端二维码</p>
              <div className={styles.box_card_content}>
                <div className={styles.login_info}>
                  <img width="200" src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU" alt="" />
                  <br />
                  <a href="https://github.com/soliury/noder-react-native" target="_blank">
                    客户端源码地址
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    accesstoken: state.user.accesstoken,
    userInfo: state.user.userInfo
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
  return {}
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideBar)
)
