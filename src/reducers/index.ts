import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import topics from './topics'

// 注册reducer
const rootReducer = combineReducers({
  routing: routerReducer,
  // 自定义的子reducer
  topics
})

export default rootReducer
