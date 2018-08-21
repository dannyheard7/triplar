import React from "react";
import api from "utils/api.js";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {login} from "Auth/actions";
import LoginForm from "Auth/Components/LoginForm.jsx";
import FormContainer from "Forms/Containers/FormContainer";

export class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
    }

    onSuccess(data) {
        this.props.dispatch(login(data.user, data.token));
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

export default withRouter(connect()(LoginContainer))