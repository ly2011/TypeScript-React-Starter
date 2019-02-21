export enum tabTypes {
  ask = 'ask',
  share = 'share',
  job = 'job',
  good = 'good',
  dev = 'dev'
}
export type TopicDetailType = {
  id: string
  title: string
  create_at: string
  author: {
    avatar_url: string
    loginname: string
  }
  author_id: string
  reply_count: number // 回复数
  visit_count: number // 点击数
  good: boolean // 是否是精华
  top: boolean // 是否置顶
  last_reply_at: string // 最后更新时间
  is_collect: boolean
  tab: tabTypes
  content: string
}

/**
 * 获取话题tag
 * @param topic 话题
 */
export const getTagInfo = (topic: TopicDetailType) => {
  if (topic.top) {
    return {
      text: '置顶',
      className: 'top'
    }
  }
  if (topic.good) {
    return {
      text: '精华',
      className: 'good'
    }
  }

  switch (topic.tab) {
    case 'ask': {
      return {
        text: '问答',
        className: topic.tab
      }
    }
    case 'share': {
      return {
        text: '分享',
        className: topic.tab
      }
    }
    case 'job': {
      return {
        text: '招聘',
        className: topic.tab
      }
    }
    case 'good': {
      return {
        text: '精华',
        className: topic.tab
      }
    }
    case 'dev': {
      return {
        text: '测试',
        className: topic.tab
      }
    }
    default: {
      return {
        text: '',
        className: 'default'
      }
    }
  }
}
