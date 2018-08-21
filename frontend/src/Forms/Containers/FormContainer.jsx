import React from "react";
import {inputParsers} from "Forms/utils/inputParsers.js";

export default class FormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.parseFormData(event);

        this.props.apiFunction(data).then(response => {
            if (response.status === 400) {
                this.setState({errors: response.data})
            } else {
                this.setState({errors: []});
                this.props.onSuccess(response.data);
            }
        });
    }

    parseFormData(event) {
        const form = event.target;
        const data = new FormData(event.target);

        for (let name of data.keys()) {
            const input = form.elements[name];
            const parserName = input.dataset.parse;

            if (parserName) {
                const parser = inputParsers[parserName];
                const parsedValue = parser(data.get(name));
                data.set(name, parsedValue);
            }
        }

        return data;
    }

    render() {
        const props = {
            onSubmit: this.handleSubmit,
            errors: this.state.errors
        };

        return React.cloneElement(this.props.children, {...props});
    }

}