import React from "react";

import RegistrationForm from "../Components/RegistrationForm";
import api from "../utils/auth.api";
import FormContainer from "../../Forms/Containers/FormContainer";
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
                <h1>Register</h1>
                <FormContainer onSuccess={this.onSuccess} apiFunction={api.registerUser}>
                    <RegistrationForm />
                </FormContainer>
            </div>
        );
    }
}
