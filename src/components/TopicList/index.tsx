import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { TopicDetailType, getTagInfo } from '@/utils/assist'
import { formatDate } from '@/utils/time'
import styles from './index.module.scss'

type topicsProps = RouteComponentProps & {
  topics: Array<TopicDetailType>
}

const toTopicDetail = (history: any, topic: TopicDetailType) => {
  const { id } = topic
  history.push(`/topic/${id}`)
}

const TopicList = ({ topics, history }: topicsProps) => (
  <div className={styles.topic_list}>
    {topics &&
      topics.map(topic => (
        <div className={`cell ${styles.cell}`} key={topic.id + '-' + Math.random()}>
          <a
            href="javascript:;"
            className={`${styles.user_avatar} pull-left`}
            onClick={() => {
              console.log('click')
            }}
          >
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
          <a
            href="javascript:;"
            className={`${styles.last_time} pull-right`}
            onClick={() => toTopicDetail(history, topic)}
          >
            <span className={styles.last_active_time}>{formatDate(topic.last_reply_at)}</span>
          </a>

          <div className={styles.topic_title_wrapper}>
            <span className={`${styles.tag} ${styles[getTagInfo(topic).className]}`}>{getTagInfo(topic).text}</span>
            <a
              href="javascript:;"
              className={styles.topic_title}
              title={topic.title}
              onClick={() => toTopicDetail(history, topic)}
            >
              {topic.title}
            </a>
          </div>
        </div>
      ))}
  </div>
)

export default withRouter(TopicList)
