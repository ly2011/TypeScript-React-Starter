import request from '../utils/request'

const BASE_URL = 'https://cnodejs.org/api/v1'

type topicParams = {
  id?: string
  [prop: string]: string | undefined
}
export const getTopics = ({ page = 1, tab = 'share', limit = 12, mdrender = 'false' } = {}) =>
  request({
    baseURL: BASE_URL,
    method: 'get',
    url: '/topics',
    params: {
      page,
      tab,
      limit,
      mdrender
    }
  })

export const getTopic = (params: topicParams = {}) => {
  const { id = '' } = params
  delete params.id
  return request({
    baseURL: BASE_URL,
    method: 'get',
    url: `/topic/${id}`,
    params
  })
}

export const Login = (params = {}) =>
  request({
    baseURL: BASE_URL,
    method: 'post',
    url: '/accesstoken',
    data: params
  })

export const getMessages = (params = {}) =>
  request({
    baseURL: BASE_URL,
    method: 'get',
    url: '/messages',
    params: params
  })

export const getUserInfo = (loginname = '') =>
  request({
    baseURL: BASE_URL,
    method: 'get',
    url: `/user/${loginname}`
  })

/* 新建主题 */
export const addTopic = (params = {}) =>
  request({
    baseURL: BASE_URL,
    method: 'post',
    url: '/topics',
    data: params
  })

export const updateTopic = (params = {}) =>
  request({
    baseURL: BASE_URL,
    method: 'post',
    url: '/topics/update',
    data: params
  })

/* 收藏主题 */
export const collectTopic = (params = {}) =>
  request({
    baseURL: BASE_URL,
    method: 'post',
    url: '/topic_collect/collect',
    data: params
  })

/* 取消主题 */
export const delTopic = (params = {}) =>
  request({
    baseURL: BASE_URL,
    method: 'post',
    url: '/topic_collect/de_collect',
    data: params
  })

/* 话题收藏数 */
export const getTopicCollect = (loginname = '') =>
  request({
    baseURL: BASE_URL,
    method: 'get',
    url: `/topic_collect/${loginname}`
  })
