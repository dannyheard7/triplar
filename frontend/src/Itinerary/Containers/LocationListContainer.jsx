import React from "react";
import LocationItinerary from "../Components/LocationItinerary";
import LocationAddContainer from "Itinerary/Containers/LocationAddContainer";

import "Itinerary/styles/itinerary.css"

export default class LocationListContainer extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            locations: this.props.locations
        };

        this.onLocationAdd = this.onLocationAdd.bind(this);
    }

    onLocationAdd(location) {
         this.setState({locations: this.state.locations.concat([location])})
    }

    render() {
        return (
            <div id="trip-itineraries">
                {this.state.locations.map((location) =>
                    <LocationItinerary key={location.id} location={location}/>
                )}
                <LocationAddContainer tripId={this.props.tripId} onSuccess={this.onLocationAdd}/>
            </div>
        );
    }
}