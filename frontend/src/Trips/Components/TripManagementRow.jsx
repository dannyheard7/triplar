import React from "react";

export default class TripManagementRow extends React.Component {
    render() {
        return (
            <div className="row">
                <button className="btn btn-light" onClick={this.props.onEditClick}>Edit Trip</button>
                <button className="btn btn-danger" onClick={this.props.onDeleteClick}>Delete Trip</button>
            </div>
        )
    }
}
