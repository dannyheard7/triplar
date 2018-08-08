import React from "react";

import TripListContainer from "Trips/Containers/TripListContainer";
import TripCreateContainer from "Trips/Containers/TripCreateContainer";

export default class TripsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTripCreate: false,
            updateTripsList: false
        };

        this.onClick = this.onClick.bind(this);
        this.onTripCreate = this.onTripCreate.bind(this);
    }

    onClick() {
        this.setState({showTripCreate: !this.state.showTripCreate, updateTripsList: false});
    }

    onTripCreate() {
        this.setState({
            showTripCreate: false,
            updateTripsList: true,
        });
    }

    render() {
        return (
            <div>
                <TripListContainer update={this.state.updateTripsList}/>
                <div className="row">
                    <div className="col md-2">
                        <button className="btn btn-primary" onClick={this.onClick}>New Trip</button>
                    </div>
                </div>
                {this.state.showTripCreate && <TripCreateContainer onTripCreate={this.onTripCreate} />}
            </div>
        )
    }
}