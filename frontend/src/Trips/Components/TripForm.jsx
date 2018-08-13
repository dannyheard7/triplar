import React from "react";

import FormFieldGroup from "Forms/Components/FormFieldGroup";
import NonFieldErrors from "Forms/Components/NonFieldErrors";
import CitySearchFieldContainer from "Forms/Containers/CitySearchFieldContainer";


export default class TripForm extends React.Component {
    render () {
        // TODO: convert to map to allow multiple locations and remove this mess
        let location = (typeof this.props.trip.locations !== 'undefined') ? this.props.trip.locations[0] : "";

        return(
            <form onSubmit={ this.props.onSubmit }>
                <NonFieldErrors errors={this.props.errors.non_field_errors} />
                <CitySearchFieldContainer  errors={this.props.errors.locations}
                                        onChange={this.props.onChange} value={location} />
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
