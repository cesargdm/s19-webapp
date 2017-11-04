import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet'
import { icon as leafletIcon } from 'leaflet'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedElement: null
    }
  }

  render() {
    return (
      <div id="app">
        <div className="nav">
          <div>
            <h1>Senti</h1>
          </div>
          <ul>
            <li></li>
          </ul>
        </div>
        <div className="content">
          <div className="map-container">
            <Map center={this.props.position} zoom={13}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {
                this.props.markers.map(marker =>
                  <Marker
                    key={marker._id}
                    position={marker.position}
                    onMouseOver={() => {}}
                    onMouseOut={() => {}}
                    onClick={() => this.setState({ selectedElement: marker._id })}
                    className="site-marker"
                    icon={leafletIcon({
                      iconUrl: '/static/img/icons/marker.svg',
                      iconSize: [40, 40],
                      iconAnchor: [20, 40],
                      popupAnchor: [40, 0]
                    })}>
                    {
                      this.state.selectedElement === marker._id
                      &&
                      <Tooltip permanent opacity={1}>
                        <span>Tooltip</span>
                      </Tooltip>
                    }
                  </Marker>
                )
              }
            </Map>
          </div>
          <div className="detail">
            <h1>Detail</h1>
            <p>Selected: { JSON.stringify(this.state.selectedElement) }</p>
          </div>
        </div>
      </div>
    )
  }
}

App.defaultProps = {
  position: [19.289487, -99.655366],
  zoom: 7,
  markers: [
    {
      _id: '23en23nejweejna',
      position: [19.282878, -99.650501]
    },
    {
      _id: 'd2o3jnewkejnajd',
      position: [19.283381, -99.678962]
    }
  ]
}

App.propTypes = {
  position: PropTypes.array
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
