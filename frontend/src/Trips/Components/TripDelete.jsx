import React from "react";
import axios from "axios";

export default class TripDelete extends React.Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(e){
        axios.delete("/trips/" + this.props.trip.id).then(response => {
            if (response.status == 204) {
                this.props.router.push('/trips');
            }
        });
    }

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header>
                    Delete {this.props.trip.name}
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the trip '{this.props.trip.name}'?
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.onDelete}>Delete Trip</Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}