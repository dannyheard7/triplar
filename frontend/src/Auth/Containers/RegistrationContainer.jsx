import React from "react";

import RegistrationForm from "Auth/Components/RegistrationForm";
import {withRouter} from "react-router-dom";
import api from "utils/api";
import FormContainer from "Forms/Containers/FormContainer";

export class RegistrationContainer extends React.Component {

    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
    }

    onSuccess(data) {
        this.props.history.push('/login')
    }

    render() {
        return (
            <FormContainer onSuccess={this.onSuccess} apiFunction={api.registerUser}>
                <RegistrationForm />
            </FormContainer>
        );
    }
}

export default withRouter(RegistrationContainer)