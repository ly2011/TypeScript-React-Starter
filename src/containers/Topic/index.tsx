import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Link } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { Skeleton, Button, Icon } from 'antd'
import Loadable from 'react-loadable'
import { formatDate } from '@/utils/time'
import Loading from '@/components/Loading'

// 引入actions
import { getTopic } from '@/actions/topic'
import { TopicDetailType, getTagInfo } from '@/utils/assist'
import styles from './index.module.scss'

const SideBar = Loadable({
  loader: () => import(/* webpackChunkName: "SideBar" */ '@/components/SideBar'),
  loading: Loading
})

type TopicProps = RouteComponentProps & {
  topic: TopicDetailType
  loading: boolean
  accesstoken: string
  actions: any
}

class Topic extends React.Component<TopicProps, any> {
  componentDidMount() {
    const { getTopic: fetchTopic } = this.props.actions
    const { match } = this.props
    const { id }: any = match.params

    fetchTopic({ id })
  }
  render() {
    const { topic, loading, accesstoken } = this.props
    return (
      <section className={styles.container}>
        <div className="main">
          <SideBar />
          <div className="content">
            <div className="panel">
              <Skeleton loading={loading} active>
                <header className={`header ${styles.header}`}>
                  <h3 className={styles.title}>
                    <span className={`${styles.tag} ${styles[getTagInfo(topic).className]}`}>
                      {getTagInfo(topic).text}
                    </span>
                    {topic.title}
                  </h3>
                  <div className={`${styles.changes} clearfix`}>
                    <span>发布于 {formatDate(topic.create_at)}</span>
                    <span>作者 {topic.author && topic.author.loginname}</span>
                    <span>{topic.visit_count} 次浏览</span>
                    <span>最后一次编辑是 {formatDate(topic.last_reply_at)}</span>
                    <span>来自 {getTagInfo(topic).text}</span>
                    {accesstoken && topic.is_collect && (
                      <Button size="small" className={`pull-right`}>
                        取消收藏
                      </Button>
                    )}
                    {accesstoken && !topic.is_collect && (
                      <Button type="primary" size="small" className={`pull-right`}>
                        收藏
                      </Button>
                    )}
                    <div className={styles.manage_topic}>
                      <Link to={`/topic/${topic.id}/edit`}>
                        <Icon type="form" style={{ fontSize: '18px' }} />
                      </Link>
                      <a href="javascript:;" onClick={() => {}}>
                        <Icon type="delete" style={{ fontSize: '18px' }} />
                      </a>
                    </div>
                  </div>
                </header>
                <div className={`${styles.topic} inner`}>
                  <div className={styles.topic_content} dangerouslySetInnerHTML={{ __html: topic.content }} />
                </div>
              </Skeleton>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const topicsActions = { getTopic }
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    topic: state.topic.topic,
    loading: state.topic.loading,
    accesstoken: state.user.accesstoken
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
  return {
    actions: bindActionCreators(topicsActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic)
