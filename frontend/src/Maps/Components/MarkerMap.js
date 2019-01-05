import React from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';

import '../styles/leaflet/leaflet.css';
import '../styles/maps.css';


export default class MarkerMap extends React.Component {
    componentDidMount() {
        if (this.props.markers) {
            delete L.Icon.Default.prototype._getIconUrl;

            L.Icon.Default.mergeOptions({
                iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/marker-shadow.png')
            });
        }
    }

    render() {
        return (
            <div>
                <Map center={this.props.center} zoom={this.props.zoom || 13}>
                    <TileLayer
                        attribution="<a href='https://wikimediafoundation.org/wiki/Maps_Terms_of_Use'>Wikimedia</a>"
                        url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
                    />
                    {this.props.markers && this.props.markers.map(this.renderMarkers)}
                </Map>
            </div>
        )
    }

    renderMarkers(item) {
        return <Marker position={item.position}><Popup>{item.popupText}</Popup></Marker>
    }
}
