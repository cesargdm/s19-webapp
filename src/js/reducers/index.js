import { combineReducers } from 'redux'

function alerts(state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

const appReducer = combineReducers({
  alerts
})

export default appReducer
