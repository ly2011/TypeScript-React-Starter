// 定义整个程序中可能使用的类型的定义
import { TopicDetailType } from '@/utils/assist'
export enum tabTypes {
  ask = 'ask',
  share = 'share',
  job = 'job',
  good = 'good',
  dev = 'dev'
}

// export type TopicState = {
//   id: string
//   title: string
//   author: {
//     avatar_url: string
//     loginname: string
//   }
//   reply_count: number // 回复数
//   visit_count: number // 点击数
//   last_reply_at: number // 最后更新时间
//   top: boolean // 是否置顶
//   good: boolean // 是否是精华
//   tab: string
// }

export type TopicsState = {
  topics: Array<TopicDetailType>
  tab: string
  loading: boolean
  pageInfo: {
    page: number
    limit: number
    total: number
  }
}
