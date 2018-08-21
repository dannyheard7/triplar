import React from "react";
import FormFieldGroup from "./FormFieldGroup";
import Autosuggest from "react-autosuggest";

export default class AutosuggestFieldGroup extends FormFieldGroup {
    renderInputComponent = inputProps => (
      <div className="form-group">
          <label>{this.props.label}</label>
          <input {...inputProps} className="form-control" name={this.props.name} required/>
            {this.props.help && <small className="form-text text-muted">{this.props.help}</small>}
            {this.props.errors &&
                <li className="list-unstyled">
                    {this.props.errors.map(this.createErrorItem)}
                </li>
            }
      </div>
    );

    onChange(event, { newValue }) {

    }

    render() {
        const inputProps = {
          value:  this.props.value,
          onChange: this.props.onChange,
        };

        return (
            <Autosuggest
                    suggestions={this.props.suggestions}
                    onSuggestionsFetchRequested={this.props.getSuggestions}
                    onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
                    getSuggestionValue={this.props.getSuggestionValue} renderSuggestion={this.props.renderSuggestion}
                    inputProps={inputProps}
                    shouldRenderSuggestions={this.props.shouldRenderSuggestions}
                    renderInputComponent={this.renderInputComponent}
                  />
        );
    }
}

AutosuggestFieldGroup.defaultProps = {
    value: "",
    suggestions: []
};