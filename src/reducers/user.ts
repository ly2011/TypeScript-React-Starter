import * as constants from '../constants/user'

const initState = {
  loginInfo: {},
  userInfo: {},
  messages: {
    has_read_messages: [],
    hasnot_read_messages: []
  },
  accesstoken: '',
  loading: false
}

export type actionProps = {
  type: string
  data: any
}
export default function user(state = initState, action: actionProps) {
  switch (action.type) {
    case constants.SET_LOGIN_INFO: {
      const { loginInfo } = action.data
      return { ...state, loginInfo }
    }
    case constants.SET_ACCESS_TOKEN: {
      const { accesstoken } = action.data
      return { ...state, accesstoken }
    }
    case constants.SET_MESSAGES: {
      const { messages } = action.data
      return { ...state, messages }
    }
    case constants.SET_USER_INFO: {
      const { userInfo } = action.data
      return { ...state, userInfo }
    }
    case constants.SET_LOADING: {
      return { ...state, loading: action.data }
    }
    default: {
      return state
    }
  }
}
