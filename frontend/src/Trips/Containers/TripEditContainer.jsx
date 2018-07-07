import React from "react";
import axios from "axios";

import TripForm from "Trips/Components/TripForm";

export default class TripEditContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trip: this.props.trip,
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    handleChange(event) {
        let trip = this.state.trip;
        trip[event.target.name] = event.target.value;

        this.setState({trip: trip});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.update();
    }

    update() {
        axios.patch("/trips/" + this.props.trip.id, this.state.trip).then(response => {
            if (response.status === 200) {
                this.setState({trip: response.data, errors: []});
                this.props.onUpdate(response.data);
            } else if (response.status === 400) {
                this.setState({errors: response.data})
            }
        });
    }

    render() {
        return <TripForm onChange={this.handleChange} onSubmit={this.handleSubmit} name={this.state.trip.name}
                errors={this.state.errors} submitLabel="Update" />
    }
}

TripEditContainer.defaultProps = {
    trip: {}
};