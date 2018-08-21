import React from "react";

import FormFieldGroup from "Forms/Components/FormFieldGroup";
import NonFieldErrors from "Forms/Components/NonFieldErrors";


export default class RegistrationForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                {this.props.errors && <NonFieldErrors errors={this.props.errors.non_field_errors} />}
                <FormFieldGroup errors={this.props.errors.email} label="Email" name="email" type="email"
                                required={true}/>
                <FormFieldGroup errors={this.props.errors.password} label="Password" name="password"
                                type="password"required={true}/>
                <FormFieldGroup errors={this.props.errors.firstName} label="First Name" name="firstName"
                                type="text" required={true}/>
                <FormFieldGroup errors={this.props.errors.lastName} label="Last Name" name="lastName" type="text"
                                required={true}/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}
