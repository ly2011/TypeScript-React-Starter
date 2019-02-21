import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { Skeleton } from 'antd'
import Loadable from 'react-loadable'
import { formatDate } from '../../utils/time'
import Loading from '../../components/Loading'

// 引入actions
import { getTopic, TopicDetailType } from '../../actions/topic'
import styles from './index.module.scss'

const SideBar = Loadable({
  loader: () => import(/* webpackChunkName: "SideBar" */ '../../components/SideBar'),
  loading: Loading
})

type TopicProps = RouteComponentProps & {
  topic: TopicDetailType
  loading: boolean
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
    const { topic, loading } = this.props
    return (
      <section className={styles.container}>
        <div className="main">
          <SideBar />
          <div className="content">
            <div className="panel">
              <Skeleton loading={loading} active>
                <header className={`header ${styles.header}`}>
                  <h3 className={styles.title}>{topic.title}</h3>
                  <div className={`${styles.changes} clearfix`}>
                    <span>发布于 {formatDate(topic.create_at)}</span>
                    <span>作者 {topic.author && topic.author.loginname}</span>
                    <span>{topic.visit_count} 次浏览</span>
                    <span>最后一次编辑是 {formatDate(topic.last_reply_at)}</span>
                    <span>来自 {topic.tabName}</span>
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
    loading: state.topic.loading
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
