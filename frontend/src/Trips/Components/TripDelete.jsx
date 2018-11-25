import React from "react";

import Modal from 'react-responsive-modal';
import {connect} from "react-redux";
import {deleteTrip} from "../utils/actions";

export class TripDelete extends React.Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.history.push(`/trips/${this.props.trip.id}`)
    }

    onDelete(e) {
        this.props.dispatch(deleteTrip(this.props.trip.id));
    };

    render() {
        if(this.props.trip) {
            return (
                <Modal open={true} onClose={this.closeModal} contentLabel={this.props.trip.name} >
                    <h2>Delete {this.props.trip.name}?</h2>

                    <p>Are you sure you want to delete the trip '{this.props.trip.name}'?</p>

                    <button onClick={this.closeModal}>Close</button>
                    <button className="btn-danger" onClick={this.onDelete}>Delete Trip</button>
                </Modal>
            );
        } else {
            return (
                <Modal open={true} role="dialog">
                    <h2>Cannot find trip</h2>

                    <button onClick={this.closeModal}>Close</button>
                </Modal>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
  return {
      trip: state.trips.trips.find(x => x.id === ownProps.match.params.id)
  };
}

export default connect(mapStateToProps)(TripDelete)