import React from "react";

import FormFieldGroup from "Forms/Components/FormFieldGroup";
import NonFieldErrors from "Forms/Components/NonFieldErrors";
import TripDetail from "./TripDetail";


// TODO: take generic Trip object
export default class TripForm extends React.Component {
    render () {
        return(
            <form onSubmit={ this.props.onSubmit }>
                <NonFieldErrors errors={this.props.errors.non_field_errors} />
                <FormFieldGroup errors={this.props.errors.name} label="Trip Name" name="name" type="text"
                                onChange={this.props.onChange} value={this.props.trip.name} required="true"/>
                <FormFieldGroup errors={this.props.errors.start_date} label="Start Date" name="start_date" type="date"
                                onChange={this.props.onChange} value={this.props.trip.start_date} required="true" />
                <FormFieldGroup errors={this.props.errors.end_date} label="End Date" name="end_date" type="date"
                                onChange={this.props.onChange} value={this.props.trip.end_date} required="true" />
                <button type="submit" className="btn btn-primary" >{this.props.submitLabel}</button>
            </form>
        );
    }
}

TripForm.defaultProps = {
    trip: {}
};
