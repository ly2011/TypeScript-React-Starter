import * as constants from '../constants'
import * as api from '../apis/cnode'
import { Dispatch } from 'redux'

import { TopicsState, tabTypes } from '../schemas'

export type SetTopics = {
  type: constants.SET_TOPICS
  data: TopicsState
}

export interface topicsParams {
  page?: number
  tab?: tabTypes
  limit?: number
  mdrender?: string
}
/**
 * 获取主题列表信息
 * @param params topicsParams
 */
export const getTopics = (params: topicsParams = { page: 1 }) => {
  return async (dispatch: Dispatch) => {
    const { tab = '', page = 1, limit = 20 } = params
    const clear = true
    dispatch({
      type: constants.SET_LOADING,
      data: true
    })
    const pageInfo = {
      page,
      limit
    }
    const searchParams = { ...pageInfo, tab }

    dispatch({
      type: constants.SET_TAB,
      data: { tab }
    })
    dispatch({
      type: constants.SET_PAGE_INFO,
      data: pageInfo
    })
    try {
      const res = await api.getTopics(searchParams)
      dispatch({
        type: constants.SET_TOPICS,
        data: { topics: res.data, clear }
      })
      dispatch({
        type: constants.SET_LOADING,
        data: false
      })
    } catch (err) {
      // if (state.tab === tab) {
      //   // 拉取更多失败
      //   commit('setPageInfo', { page: state.pageInfo.page })
      // }
      // commit('setLoading', { loading: false })
      dispatch({
        type: constants.SET_LOADING,
        data: false
      })
    }
  }
}
