import * as constants from '../constants/topic'

const initState = {
  topic: {},
  loading: false
}

export type actionProps = {
  type: string
  data: any
}
export default function topic(state = initState, action: actionProps) {
  switch (action.type) {
    case constants.SET_TOPIC: {
      const { topic } = action.data
      return { ...state, topic }
    }
    case constants.SET_LOADING: {
      return { ...state, loading: action.data }
    }
    default: {
      return state
    }
  }
}
