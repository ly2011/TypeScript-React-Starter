import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Pagination, Skeleton } from 'antd'
import Loadable from 'react-loadable'

import Loading from '../../components/Loading'

import { topTabs } from '../../utils/tabs'

// 引入actions
import { getTopics } from '../../actions/topics'

import styles from './index.module.scss'

const TopicList = Loadable({
  loader: () => import(/* webpackChunkName: "TopicList" */ '../../components/TopicList'),
  loading: Loading
})
const SideBar = Loadable({
  loader: () => import(/* webpackChunkName: "SideBar" */ '../../components/SideBar'),
  loading: Loading
})

type tabProps = {
  title: string
  tab: string
}
class Topics extends React.Component<any, any> {
  componentDidMount() {
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
  handlePaginationChange = (page: number) => {
    const params = {
      tab: this.props.tab,
      page
    }
    const { getTopics: fetchTopics } = this.props.actions
    fetchTopics(params)
  }
  render() {
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
              <div className={`inner no-padding ${styles.table_box}`}>
                <Skeleton loading={loading} active>
                  <TopicList topics={topics} />
                  {pageInfo.total && (
                    <div className={styles.pagination}>
                      <Pagination
                        defaultCurrent={pageInfo.page}
                        pageSize={pageInfo.limit}
                        total={pageInfo.total}
                        onChange={this.handlePaginationChange}
                      />
                    </div>
                  )}
                </Skeleton>
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
