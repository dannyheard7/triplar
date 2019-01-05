import React from "react";
import {inputParsers} from "../utils/inputParsers.js";

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

        this.props.apiFunction(data).then(({data}) => {
            let result = data.data.result;

            if (result.errors && result.errors.length > 0) {
                let errors = result.errors.reduce((dict, {field, messages}) => {
                    dict[field] = messages;
                    return dict;
                }, {});

                this.setState({errors: errors})
            } else {
                this.setState({errors: []});
                this.props.onSuccess(result);
            }
        }).catch(error => {
             console.log(error);
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

        let variables = Object();
        for(let pair of data.entries()) {
           variables[pair[0]] = pair[1];
        }

        return variables;
    }

    render() {
        const props = {
            onSubmit: this.handleSubmit,
            errors: this.state.errors
        };

        return React.cloneElement(this.props.children, {...props});
    }

}