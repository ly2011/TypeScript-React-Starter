import { Dispatch } from 'redux'
import * as constants from '../constants/user'
import * as api from '../apis/cnode'

export type LoginInfo = {
  id?: string
  loginname?: string
  avatar_url?: string
}
export type userState = {
  loginInfo: LoginInfo
  userInfo: object
  messages: {
    has_read_messages: object[]
    hasnot_read_messages: object[]
  }
  accesstoken: string
  loading: boolean
}

export type LoginParams = {
  accesstoken: string
}
/**
 * 登录
 * @param params any
 */
export const doLogin = (params: LoginParams) => {
  return async (dispatch: Dispatch) => {
    // 添加Promise
    return new Promise(async (resolve, reject) => {
      dispatch({
        type: constants.SET_LOADING,
        data: true
      })

      try {
        const res: any = await api.Login(params)
        const loginInfo: LoginInfo = {}
        if (res.success) {
          loginInfo.loginname = res.loginname
          loginInfo.id = res.id
          loginInfo.avatar_url = res.avatar_url
          dispatch({
            type: constants.SET_LOGIN_INFO,
            data: { loginInfo: loginInfo }
          })
          dispatch({
            type: constants.SET_ACCESS_TOKEN,
            data: { accesstoken: params.accesstoken }
          })
        }

        dispatch({
          type: constants.SET_LOADING,
          data: false
        })

        resolve(loginInfo)
      } catch (err) {
        dispatch({
          type: constants.SET_LOADING,
          data: false
        })
        reject(null)
      }
    })
  }
}
