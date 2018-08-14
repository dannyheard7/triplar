import React from "react";
import Pikaday from 'pikaday'
import "pikaday/css/pikaday.css";
import Moment from 'moment';
import FormFieldGroup from "./FormFieldGroup";

export default class DateFieldGroup extends FormFieldGroup {

    constructor (params) {
        super(params);
        this.date_picker = React.createRef();

         this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        new Pikaday({
            field: this.date_picker.current,
            format: 'YYYY-MM-DD',
            onSelect: this.onChange
        })
    }

    onChange(value) {
        value = Moment(value).format('YYYY-MM-DD');

        this.props.onChange({target: {name: this.props.name, value: value}})
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input name={this.props.name} type="text" autoComplete="off" onChange={this.props.onChange}
                       value={this.props.value} required={this.props.required} className="form-control"
                       ref={this.date_picker}/>
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