import React from "react";

import FormFieldGroup from "Forms/Components/FormFieldGroup";
import NonFieldErrors from "Forms/Components/NonFieldErrors";
import DateFieldGroup from "Forms/Components/DateFieldGroup";


export default function TripForm(props) {
    let trip = (props.trip) ? props.trip : {};

    return(
        <form onSubmit={props.onSubmit }>
            <NonFieldErrors errors={props.errors.non_field_errors} />
            <FormFieldGroup errors={props.errors.name} label="Trip Name" name="name" type="text"
                            onChange={props.onChange} value={trip.name} required="true"/>
            <DateFieldGroup errors={props.errors.start_date} label="Start Date" name="start_date"
                            onChange={props.onChange} value={trip.start_date} required="true" />
            <DateFieldGroup errors={props.errors.end_date} label="End Date" name="end_date"
                            onChange={props.onChange} value={trip.end_date} required="true" />
            <button type="submit" className="btn btn-primary" >{props.submitLabel}</button>
        </form>
    );
}

