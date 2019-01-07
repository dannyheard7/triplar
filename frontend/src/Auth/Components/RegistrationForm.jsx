import React from "react";

import FormFieldGroup from "../../Forms/Components/FormFieldGroup";
import NonFieldErrors from "../../Forms/Components/NonFieldErrors";


export default class RegistrationForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <NonFieldErrors errors={this.props.nonFieldErrors} />
                <FormFieldGroup errors={this.props.fieldErrors.email} label="Email" name="email" type="email"
                                required={true}/>
                <FormFieldGroup errors={this.props.fieldErrors.password} label="Password" name="password"
                                type="password"required={true}/>
                <FormFieldGroup errors={this.props.fieldErrors.firstName} label="First Name" name="firstName"
                                type="text" required={true}/>
                <FormFieldGroup errors={this.props.fieldErrors.lastName} label="Last Name" name="lastName" type="text"
                                required={true}/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}
