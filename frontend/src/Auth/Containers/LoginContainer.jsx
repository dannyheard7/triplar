import React from "react";
import api from "Auth/utils/auth.api.js";

import {login} from "Auth/utils/actions";
import LoginForm from "Auth/Components/LoginForm.jsx";
import FormContainer from "Forms/Containers/FormContainer";

export default class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
    }

    onSuccess(data) {
        login(data.user, data.token);
        this.props.onLogin(data.user, data.token);
        this.props.history.push('/trips')
    }

    render() {
        return (
            <FormContainer onSuccess={this.onSuccess} apiFunction={api.getLoginToken}>
                <LoginForm />
            </FormContainer>
        );
    }
}