import { TopicsState } from '../schemas'
import * as constants from '../constants'

const initState = {
  topics: [],
  tab: '',
  loading: false,
  pageInfo: {
    page: 1,
    limit: 15,
    total: 1000
  }
}

export type actionProps = {
  type: string
  data: any
}
export default function topics(state: TopicsState = initState, action: actionProps): TopicsState {
  switch (action.type) {
    case constants.SET_TOPICS: {
      const { topics, clear } = action.data
      if (clear) {
        return { ...state, topics }
      }

      return { ...state, ...{ topics: state.topics.concat(topics) } }
    }
    case constants.SET_LOADING: {
      return { ...state, ...{ loading: action.data } }
    }
    case constants.SET_TAB: {
      return {
        ...state,
        ...{ tab: action.data.tab }
      }
    }
    default: {
      return state
    }
  }
}
