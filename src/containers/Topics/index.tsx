import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { topTabs } from '../../utils/tabs'

// 引入actions
import { getTopics } from '../../actions/topics'
// import { TopicsState } from '../../schemas'

import TopicList from '../../components/TopicList'
import SideBar from '../../components/SideBar'

import styles from './index.module.scss'

type tabProps = {
  title: string
  tab: string
}
class Topics extends React.Component<any, any> {
  state = {
    curTab: 'all'
  }
  componentDidMount() {
    // console.log('actions: ', this.props.topics, this.props.actions)
    const { getTopics: fetchTopics } = this.props.actions
    fetchTopics()
  }
  changeTab = (item: tabProps) => {
    const { getTopics: fetchTopics } = this.props.actions
    const { tab } = item
    if (tab === this.props.tab) {
      return
    }
    const params = { tab: tab, page: 1 }
    fetchTopics(params)
  }
  render() {
    // console.log('topics: ', this.props.topics)
    const { topics = [], loading, tab, pageInfo } = this.props
    return (
      <section className={styles.container}>
        <div className="main">
          <SideBar />
          <div className="content">
            <div className="panel">
              <header className="header">
                {topTabs &&
                  topTabs.map(item => (
                    <a
                      className={`${styles.topic_tab} ${styles[item.tab === tab ? 'current_tab' : '']}`}
                      key={item.tab}
                      onClick={() => this.changeTab(item)}
                    >
                      {item.title}
                    </a>
                  ))}
              </header>
              <div className={styles.table_box}>
                <TopicList topics={topics} />
                {pageInfo.total && <div className={styles.pagination} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

// export default Topics
const topicsActions = { getTopics }
const mapStateToProps = (state: any, ownProps: any) => {
  // console.log('state: ', state)
  return {
    topics: state.topics.topics,
    loading: state.topics.loading,
    tab: state.topics.tab,
    pageInfo: state.topics.pageInfo
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
)(Topics)
