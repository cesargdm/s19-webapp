import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './containers/App'

import appReducer from './reducers'

const store = createStore(appReducer)

function Routes() {
  return (
    <Provider store={store}>
      <Router>
        <div id="app">
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default Routes
