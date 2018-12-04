import React from "react";
import ItineraryDay from "Itinerary/Components/ItineraryDay";
import DroppablePlaceListContainer from "Places/Containers/DroppablePlaceListContainer";
import {connect} from "react-redux";
import {addItemToItineraryDay} from "../utils/actions";
import MarkerMap from "../../Maps/Components/MarkerMap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";

export class ItineraryDayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMap: false
        };

        this.canDrop = this.canDrop.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragRemove = this.onDragRemove.bind(this);
        this.onMapIconClick = this.onMapIconClick.bind(this);
    }

    canDrop(item) {
        return (this.props.places.indexOf(item) === -1)
    }

    onDrop(item) {
        this.props.dispatch(addItemToItineraryDay(this.props.itinerary.id, item.id, this.props.day, this.props.places.length));
    }

    onDragRemove(item) {
        console.log("here");
    }

    onMapIconClick() {
        this.setState({showMap: !this.state.showMap});
    }

    render () {
        const itinerary = this.props.itinerary;
        const position = [itinerary.city.location.lat, itinerary.city.location.lng];
        let placePositions = this.props.places.filter(x => x.coordinates).map(x => ({position: [x.coordinates.latitude, x.coordinates.longitude],
            popupText: x.name}));

        return (
            <div>
                <button className="btn btn-light" onClick={this.onMapIconClick}><FontAwesomeIcon icon={faMapMarkedAlt}/></button>
                {this.state.showMap && <MarkerMap center={position} zoom={13} markers={placePositions}/>}
                <ItineraryDay day={this.props.day}/>
                <DroppablePlaceListContainer places={this.props.places} path={this.props.path} canDrop={this.canDrop}
                                             onDrop={this.onDrop} onDragRemove={this.onDragRemove}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let placeIds = state.itineraries.itineraryItems.filter(x => x.itineraryId === ownProps.itinerary.id &&
        x.date === ownProps.day).map(x => x['place']);

    return {
        places: state.places.places.filter(p => placeIds.includes(p.id))
    }
}

export default connect(mapStateToProps)(ItineraryDayContainer)
