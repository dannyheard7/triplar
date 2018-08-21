import React from "react";
import Pikaday from 'pikaday'
import Moment from 'moment';

import "pikaday/css/pikaday.css";
import FormFieldGroup from "./FormFieldGroup";

export default class DateFieldGroup extends FormFieldGroup {

    constructor(props) {
        super(props);
        this.date_picker = React.createRef();
    }

    componentDidMount() {
        new Pikaday({
            field: this.date_picker.current,
            format: 'DD/MM/YYYY',
            onSelect: this.onChange
        })
    };

    formatValue = (value) => Moment(value).format('DD/MM/YYYY');

    render() {
        let value = this.formatValue(this.props.value);

        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input name={this.props.name} type="text" autoComplete="off" value={value}
                       required={this.props.required} className="form-control" ref={this.date_picker}
                       data-parse="date" placeholder="DD/MM/YYYY" readOnly={true}/>
                {this.props.help && <small className="form-text text-muted">{this.props.help}</small>}
                {this.props.errors &&
                <li className="list-unstyled">
                    {this.props.errors.map(this.createErrorItem)}
                </li>
                }
            </div>
        );
    }
}