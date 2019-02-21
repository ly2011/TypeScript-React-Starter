import { Dispatch } from 'redux'
import * as constants from '../constants/topic'
import * as api from '../apis/cnode'
import { TopicDetailType } from '../utils/assist'

export type topicState = {
  topic: TopicDetailType
  loading: boolean
}
type topicParams = {
  id: string
  [prop: string]: string | undefined
}
/**
 * 获取主题列表信息
 * @param params topicsParams
 */
export const getTopic = (params: topicParams) => {
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
