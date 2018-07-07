import React from "react";

import FormFieldGroup from "Forms/Components/FormFieldGroup";
import NonFieldErrors from "Forms/Components/NonFieldErrors";


// TODO: take generic Trip object
export default class TripForm extends React.Component {
    render () {
        return(
            <form onSubmit={ this.props.onSubmit }>
                <NonFieldErrors errors={this.props.errors.non_field_errors} />
                <FormFieldGroup errors={this.props.errors.name} label="Trip Name" name="name" type="text"
                                onChange={this.props.onChange} value={this.props.name} required="true"/>
                <button type="submit" className="btn btn-primary" >{this.props.submitLabel}</button>
            </form>
        );
    }
}