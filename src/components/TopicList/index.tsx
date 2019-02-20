import React from 'react'
import {Link, withRouter, RouteComponentProps} from 'react-router-dom'

import {formatDate} from '../../utils/time'
import styles from './index.module.scss'

enum tabTypes {
  ask = 'ask',
  share = 'share',
  job = 'job',
  good = 'good',
  dev = 'dev'
}

type topicProps = {
  id: string;
  title: string;
  author: {
    avatar_url: string;
    loginname:string;
  };
  reply_count: number; // 回复数
  visit_count: number; // 点击数
  last_reply_at: number; // 最后更新时间
  top: boolean; // 是否置顶
  good: boolean; // 是否是精华
  tab: tabTypes;
}
type topicsProps = RouteComponentProps & {
  topics: Array<topicProps>
}
const getTagInfo = (topic: topicProps) => {
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

const TopicList = ({ topics }: topicsProps) => (
  <div className={styles.topic_list}>
    {
      topics && topics.map((topic) => (
        <div className={styles.cell} key={topic.id + '-' + Math.random()}>
          <a href="javascript:;" className={`${styles.user_avatar} pull-left`} onClick={() => {
            console.log('click')
          }}>
            <img src={topic.author.avatar_url} title={topic.author.loginname} />
          </a>
          <span className={`${styles.reply_count} pull-left`}>
            <span className={styles.count_of_replies} title="回复数">
              {topic.reply_count}
            </span>
            <span className={styles.count_seperator}>/</span>
            <span className={styles.count_of_visits} title="点击数">
              {topic.visit_count}
            </span>
          </span>
          <a href="javascript:;" className={`${styles.last_time} pull-right`} onClick={() => {
            console.log('click2')
          }}>
            <span className={styles.last_active_time}>
              {formatDate(topic.last_reply_at)}
            </span>
          </a>

          <div className={styles.topic_title_wrapper}>
            <span className={`${styles.tag} ${styles[getTagInfo(topic).className]}`}>
              {getTagInfo(topic).text}
            </span>
            <a href="javascript:;" className={styles.topic_title} title={topic.title} onClick={() => {console.log('click3')}}>
              {topic.title}
            </a>
          </div>
        </div>
      ))
    }
  </div>
)

export default withRouter(TopicList)