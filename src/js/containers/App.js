import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
      </div>
    )
  }
}

function mapStateToProps({}) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

App.propTypes = {
  credentials: PropTypes.object,
  setCredentials: PropTypes.func,
  location: PropTypes.object,
  appAlert: PropTypes.object,
  dismissAlert: PropTypes.func,
  history: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
