import React from "react";
import DestinationItinerary from "../Components/DestinationItinerary";
import DestinationAddContainer from "Trips/Containers/DestinationAddContainer";

export default class ItineraryListContainer extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            itineraries: this.props.itineraries
        };

        this.onDestinationAdd = this.onDestinationAdd.bind(this);
    }

    onDestinationAdd(destination) {
         this.setState({itineraries: this.state.itineraries.concat([destination])})
    }

    render() {
        const itineraries = this.state.itineraries.map((itinerary) =>
            <DestinationItinerary key={itinerary.id} itinerary={itinerary}/>
        );

        return (
            <div>
                {itineraries}
                <DestinationAddContainer tripId={this.props.tripId} onSuccess={this.onDestinationAdd}/>
            </div>
        );
    }
}