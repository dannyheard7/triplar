import React from "react";
import api from "utils/api.js";
import AutosuggestFieldGroup from "Forms/Components/AutosuggestFieldGroup";

export default class CitySearchFieldContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            suggestions: []
        };

        this.onChange = this.onChange.bind(this);
    }

    getSuggestions = (event) => {
        let value = event.value;

        api.searchCities(value).then(response => {
            if(response.status === 200) {
                this.setState({suggestions: response.data})
            }
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({suggestions: []});
    };

    shouldRenderSuggestions(value) {
      return value.trim().length > 2;
    }

    getSuggestionValue = suggestion => suggestion.name + ", " + suggestion.country;
    renderSuggestion(suggestion) {
         return (
             <div>
                 {suggestion.name + ", " + suggestion.country}
             </div>
         );
    }

    onChange(event, { newValue }) {
         this.setState({value: newValue});
     };


    render() {
        return (
            <AutosuggestFieldGroup name={this.props.name} value={this.state.value} suggestions={this.state.suggestions}
                                   renderSuggestion={this.renderSuggestion} getSuggestionValue={this.getSuggestionValue}
                                   getSuggestions={this.getSuggestions} onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                shouldRenderSuggestions={this.shouldRenderSuggestions} label="Location" errors={this.props.errors}
                                onChange={this.onChange}/>
        );
    }
}