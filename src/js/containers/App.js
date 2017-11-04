import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet'
import { icon as leafletIcon } from 'leaflet'

import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyBW2DnON1SFfQIRWk3fB7kj3I2YjdByHSI",
  authDomain: "senti-5ca31.firebaseapp.com",
  databaseURL: "https://senti-5ca31.firebaseio.com",
  projectId: "senti-5ca31",
  storageBucket: "senti-5ca31.appspot.com",
  messagingSenderId: "45207062216"
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedElement: null,
      reports: [],
      selectedCategory: null
    }
  }

  componentWillMount() {
    // Get reports collection from firebase
    let messagesRef = firebase.database().ref('reports').orderByKey().limitToLast(100)
    messagesRef.on('child_added', report => {
      /* Update React state when message is added at Firebase Database */
      var text = report.val()

      const site = {
          positions: [text.coords.latitude, text.coords.longitude],
          elements: text.options
      }

      this.setState(prevState => ({ reports: prevState.reports.concat([site]) }) )
      })
    }

    getName(code) {
      switch (code) {
        case "0": return "Víveres"
        case "1": return "Herramientas"
        case "2": return "Maquinaria"
        case "3": return "Asistencia Médica"
        case "4": return "Vivienda"
        case "5": return "Asistencia para Animales"
        case "6": return "Manos"
        default: return "Otro"
      }
    }

  render() {
    let categorized = []

    this.state.reports.map(report => {
      if (!report || !report.elements || !report.elements[0] || !report.elements[0].type ) return

      let foundIndex = categorized.findIndex(category =>
        category.type === report.elements[0].type.charAt(0)
      )

      if (!report.elements) return

      foundIndex !== -1
      ? report.elements.map(elem => categorized[foundIndex].elements.push(elem))
      : categorized.push({
        type: report.elements[0].type.charAt(0),
        elements: [...report.elements]
      })
    })

    console.log('CATE', categorized)

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
                this.state.reports.map(marker =>
                  <Marker
                    key={marker._id}
                    position={marker.positions}
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
            <div>
              {
                categorized.map((category, index) =>
                  <div key={index} style={{marginBottom: 10}} className="category" onClick={() => this.setState({selectedCategory: category.type })}>
                    <div className="content">
                      <p className="name">
                        {this.getName(category.type)}
                      </p>
                      <p className="number">
                        {category.elements.length}
                      </p>
                    </div>
                    {
                      this.state.selectedCategory === category.type
                      &&
                      <ul>
                        {
                          category.elements.map(element =>
                            <li>{element.title}</li>
                          )
                        }
                      </ul>
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

App.defaultProps = {
  position: [19.289487, -99.655366],
  zoom: 7
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
