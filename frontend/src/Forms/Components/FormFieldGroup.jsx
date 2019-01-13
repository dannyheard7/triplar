import React from "react";

export default class FormFieldGroup extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input name={this.props.name} type={this.props.type} onChange={this.props.onChange} id={this.props.name}
                             value={this.props.value} required={this.props.required}  className="form-control" />
                {this.props.help && <small className="form-text text-muted">{this.props.help}</small>}
                {this.props.errors &&
                    <ul className="list-unstyled">
                        {this.props.errors.map(this.createErrorItem)}
                    </ul>
                }
            </div>
        );
    }

    createErrorItem(error) {
        return (
            <li>{error}</li>
        )
    }
}