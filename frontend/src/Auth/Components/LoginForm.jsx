import React from "react";

import FormFieldGroup from "Forms/Components/FormFieldGroup";
import NonFieldErrors from "Forms/Components/NonFieldErrors";

export default class LoginForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <NonFieldErrors errors={this.props.errors.non_field_errors}/>
                <FormFieldGroup errors={this.props.errors.email} label="Email" name="email" type="email"
                                onChange={this.props.onChange} required="true"/>
                <FormFieldGroup errors={this.props.errors.password} label="Password" name="password"
                                type="password" onChange={this.props.onChange} required="true"/>
                <button type="submit" className="btn btn-primary" id="login-submit">Login</button>
            </form>
        );
    }
}