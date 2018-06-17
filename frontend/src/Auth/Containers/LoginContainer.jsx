import React from "react";
import axios from "axios";
import {connect} from "react-redux";

import {login} from "Auth/actions";
import LoginForm from "Auth/Components/LoginForm.jsx";

export class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.login();
    }

    login() {
        const email = this.state.email;
        const password = this.state.password;

        axios.post("/token/", {'email': email, 'password': password}).then(response => {
            let data = response.data;

            if (response.status === 400) {
                this.setState({errors: data});
            } else {
                this.props.dispatch(login(data.user, data.token));
            }
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <LoginForm onSubmit={this.handleSubmit} onChange={this.handleChange} errors={this.state.errors}/>
        );
    }
}

export default connect()(LoginContainer)