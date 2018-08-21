import React from 'react'
import {Map, TileLayer} from 'react-leaflet'

import 'Maps/styles/leaflet/leaflet.css';
import 'Maps/styles/maps.css';

export default class CityMap extends React.Component {

  render() {
    const position = [this.props.city.location.lat, this.props.city.location.lng];

    return (
        <div>
          <Map center={position} zoom={13}>
            <TileLayer
              attribution="<a href='https://wikimediafoundation.org/wiki/Maps_Terms_of_Use'>Wikimedia</a>"
              url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
            />
          </Map>
        </div>
    )
  }
}
