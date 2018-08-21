import React from "react";
import api from "Trips/utils/trips.api.js";

import Modal from 'react-modal';

export default class TripDelete extends React.Component {
    customStyles = {
      content : {
        top                   : '40%',
        left                  : '40%',
        right                 : '40%',
        bottom                : '40%',
      }
    };

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.history.push(`/trips/${this.props.trip.id}`)
    }

    onDelete(e) {
        api.deleteTrip(this.props.trip.id).then(({data}) => {
            if (data.data.deleteTrip.result === true) {
                this.props.history.push('/trips')
            }
        });
    };

    render() {
        return (
            <Modal isOpen={true} onRequestClose={this.closeModal} contentLabel={this.props.trip.name} style={this.customStyles}
                role="dialog">
                <h2>
                    Delete {this.props.trip.name}
                </h2>

                <p>
                    Are you sure you want to delete the trip '{this.props.trip.name}'?
                </p>

                <button onClick={this.closeModal}>Close</button>
                <button className="btn-danger" onClick={this.onDelete}>Delete Trip</button>

            </Modal>
        );
    }
}