import React from "react";

import FormFieldGroup from "Forms/Components/FormFieldGroup";
import NonFieldErrors from "Forms/Components/NonFieldErrors";


export default class RegistrationForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <NonFieldErrors errors={this.props.errors.non_field_errors} />
                <FormFieldGroup errors={this.props.errors.email} label="Email" name="email" type="email"
                                required="true"/>
                <FormFieldGroup errors={this.props.errors.password} label="Password" name="password"
                                type="password"required="true"/>
{/*                <FormFieldGroup errors={this.props.errors.confirm_password} label="Confirm Password"
                                name="confirmPassword" type="password" onChange={this.props.onChange}
                                required="true"/>*/}
                <FormFieldGroup errors={this.props.errors.first_name} label="First Name" name="first_name"
                                type="text" required/>
                <FormFieldGroup errors={this.props.errors.last_name} label="Last Name" name="last_name" type="text"
                                required/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}
