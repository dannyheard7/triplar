import React from "react";

import TripListContainer from "Trips/Containers/TripListContainer";
import TripCreateContainer from "Trips/Containers/TripCreateContainer";

// TODO: Move into a functional component

export default class TripsContainer extends React.Component {
     render() {
        return (
            <div>
                <TripListContainer />
                <TripCreateContainer />
            </div>
        )
    }
}