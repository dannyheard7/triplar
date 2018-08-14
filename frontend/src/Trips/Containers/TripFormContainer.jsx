import React from "react";
import TripForm from "Trips/Components/TripForm";

export default class TripFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trip: this.props.trip,
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        let trip = this.state.trip;
        trip[event.target.name] = event.target.value;

        this.setState({trip: trip});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.apiFunction(this.state.trip).then(response => {
            if(response.status === 400) {
                this.setState({errors: response.data})
            } else {
                this.setState({trip: {}, errors: []});
                this.props.onSuccess(response.data);
            }
        });
    }

    render () {
        return (
            <TripForm onChange={this.handleChange} onSubmit={this.handleSubmit} submitLabel={this.props.submitLabel}
                      errors={this.state.errors} suggestions={this.state.suggestions} trip={this.state.trip} />
        )
    }

}

TripFormContainer.defaultProps = {
    trip: {}
};