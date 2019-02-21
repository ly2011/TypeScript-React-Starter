import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import topics from './topics'
import topic from './topic'
import user from './user'

// 注册reducer
const rootReducer = combineReducers({
  routing: routerReducer,
  // 自定义的子reducer
  topics,
  topic,
  user
})

export default rootReducer
