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
                            onChange={props.onChange} value={trip.name} required={true}/>
            <DateFieldGroup errors={props.errors.startDate} label="Start Date" name="startDate"
                            onChange={props.onChange} value={trip.startDate} required={true} />
            <DateFieldGroup errors={props.errors.endDate} label="End Date" name="endDate"
                            onChange={props.onChange} value={trip.endDate} required={true} />
            <button type="submit" className="btn btn-primary" >{props.submitLabel}</button>
        </form>
    );
}

