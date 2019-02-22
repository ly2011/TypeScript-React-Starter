import React, { PureComponent } from 'react'
import { RouteProps } from 'react-router-dom'
import styles from './index.module.scss'

type IProps = {
  visibilityHeight: number | string
  backPosition: any
  customStyle: any
}
type BackTopProps = RouteProps & IProps
type BackTopState = {
  visible: boolean
  interval: number
  isMoving: boolean
}
class BackTop extends PureComponent<BackTopProps, BackTopState> {
  state = {
    visible: false,
    interval: 0,
    isMoving: false
  }
  static defaultProps: IProps
  // static defaultProps = {
  //   visibilityHeight: 400,
  //   backPosition: 0,
  //   customStyle: {
  //     width: '24px',
  //     top: '75px',
  //     right: '0px'
  //   }
  // }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
  }
  handleScroll = () => {
    this.setState({
      visible: window.pageYOffset > this.props.visibilityHeight
    })
  }
  backToTop = () => {
    if (this.state.isMoving) return
    const start = window.pageYOffset
    let i = 0
    this.setState({
      isMoving: true
    })
    const interval = window.setInterval(() => {
      const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
      if (next <= this.props.backPosition) {
        window.scrollTo(0, this.props.backPosition)
        clearInterval(this.state.interval)
        this.setState({
          isMoving: false
        })
      } else {
        window.scrollTo(0, next)
      }
      i++
    }, 16.7)
    this.setState({ interval })
  }
  easeInOutQuad(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b
    return (-c / 2) * (--t * (t - 2) - 1) + b
  }
  render() {
    const { visible } = this.state
    if (visible) {
      return (
        <div style={this.props.customStyle} className={styles['back-to-ceiling']} onClick={this.backToTop}>
          回到顶部
        </div>
      )
    }
    return null
  }
}

BackTop.defaultProps = {
  visibilityHeight: 400,
  backPosition: 0,
  customStyle: {
    width: '24px',
    top: '75px',
    right: '0px'
  }
}

export default BackTop
