import React from "react";

export default class TripManagementRow extends React.Component {
    render() {
        return (
            <div className="row">
                <button onClick={this.props.onEditClick}>Edit Trip</button>
                <button className="btn btn-danger" onClick={this.props.onDeleteClick}>Delete Trip</button>
            </div>
        )
    }
}
