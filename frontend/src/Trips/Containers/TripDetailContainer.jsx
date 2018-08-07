import React from "react";
import api from "utils/api.js"

import TripDetail from "Trips/Components/TripDetail";
import TripManagementRow from "Trips/Components/TripManagementRow";
import TripDelete from "Trips/Components/TripDelete";
import TripEditContainer from "Trips/Containers/TripEditContainer";

export default class TripDetailContainer extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            trip: null,
            edit: false,
            delete: false
        };

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        api.getTrip(this.props.match.params.id).then(response => {
            this.setState({ trip: response.data })
        });
    }

    onUpdate(trip) {
        this.setState({trip: trip, edit: false});
    }

    onEditClick(e) {
        this.setState({edit: true});
    }

    onDeleteClick(e) {
        this.setState({delete: true});
    }

    render() {
        const trip = this.state.trip;

        if (!trip) {
            return <div>Loading</div>
        }
        if (this.state.edit) {
            return <TripEditContainer trip={trip} onUpdate={this.onUpdate}/>
        }
        return (
            <div>
                <TripDetail trip={trip} />
                <TripManagementRow trip={trip} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} />
                {this.state.delete && <TripDelete trip={trip} router={this.props.router}/>}
            </div>
        );
    }
}