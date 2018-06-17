import React from "react";

export default class FormFieldGroup extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input name={this.props.name} type={this.props.type} onChange={this.props.onChange}
                             value={this.props.value} required={this.props.required}  class="form-control" />
                {this.props.help && <small class="form-text text-muted">{this.props.help}</small>}
                {this.props.errors &&
                    <li className="list-unstyled">
                        {this.props.errors.map(this.createErrorItem)}
                    </li>
                }
            </div>
        );
    }

    createErrorItem(error) {
        return (
            <ul>{error}</ul>
        )
    }
}