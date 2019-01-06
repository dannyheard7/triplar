import React from "react";
import DroppablePlaceListContainer from "../../Places/Containers/DroppablePlaceListContainer";
import {connect} from "react-redux";
import MarkerMap from "../../Maps/Components/MarkerMap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";

export class ItineraryDayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMap: false
        };

        this.onMapIconClick = this.onMapIconClick.bind(this);
    }

    onMapIconClick() {
        this.setState({showMap: !this.state.showMap});
    }

    render () {
        const itinerary = this.props.itinerary;
        let position = [];
        let placePositions = [];

        if(itinerary.city && itinerary.city.latitude && itinerary.city.longitude) {
            position = [itinerary.city.latitude, itinerary.city.longitude];
            placePositions = this.props.places.filter(x => x.coordinates).map(x => (
                {position: [x.coordinates.latitude, x.coordinates.longitude], popupText: x.name}
            ));
        }

        return (
            <div>
                <button className="btn btn-light" onClick={this.onMapIconClick}><FontAwesomeIcon icon={faMapMarkedAlt}/></button>
                {this.state.showMap && <MarkerMap center={position} zoom={13} markers={placePositions}/>}
                <DroppablePlaceListContainer places={this.props.places} path={this.props.path} dragging={this.props.dragging}
                                             droppableId="itinerary-day-droppable" keyFunc={(id) => id + itinerary.id}/>
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
