import React from "react";

import RegistrationForm from "Auth/Components/RegistrationForm";
import api from "Auth/utils/auth.api";
import FormContainer from "Forms/Containers/FormContainer";
import {Helmet} from "react-helmet";

export default class RegistrationContainer extends React.Component {

    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
    }

    onSuccess(data) {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Register | Triplar</title>
                </Helmet>
                <FormContainer onSuccess={this.onSuccess} apiFunction={api.registerUser}>
                    <RegistrationForm />
                </FormContainer>
            </div>
        );
    }
}
