import React from "react";
import {inputParsers} from "../utils/inputParsers.js";
import {connect} from "react-redux";

class ReduxFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.parseFormData(event);

        this.props.dispatch(this.props.action(data));
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
        let errors = [];
        if(this.props.errors) {
            errors = this.props.errors.reduce((dict, {field, messages}) => {
                dict[field] = messages;
                return dict;
            }, {});
        }

        const props = {
            onSubmit: this.handleSubmit,
            errors: errors
        };

        return React.cloneElement(this.props.children, {...props});
    }
}

export default connect()(ReduxFormContainer)