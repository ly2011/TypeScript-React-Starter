import { Dispatch } from 'redux'
import * as constants from '../constants/topic'
import * as api from '../apis/cnode'
// import store from '../store'

export type TopicDetailType = {
  id: string
  title: string
  create_at: string
  author: {
    avatar_url: string
    loginname: string
  }
  visit_count: number
  last_reply_at: string
  is_collect: boolean
  tabName: string
  content: string
}
export type topicState = {
  topic: TopicDetailType
  loading: boolean
}
type topicParams = {
  id?: string
  [prop: string]: string | undefined
}
/**
 * 获取主题列表信息
 * @param params topicsParams
 */
export const getTopic = (params: topicParams = {}) => {
  // const state = store.getState()
  return async (dispatch: Dispatch) => {
    dispatch({
      type: constants.SET_LOADING,
      data: true
    })

    try {
      const res: any = await api.getTopic(params)
      let topic = {}
      if (res.success) {
        topic = res.data
      }
      dispatch({
        type: constants.SET_TOPIC,
        data: { topic: topic }
      })
      dispatch({
        type: constants.SET_LOADING,
        data: false
      })
    } catch (err) {
      dispatch({
        type: constants.SET_LOADING,
        data: false
      })
    }
  }
}
