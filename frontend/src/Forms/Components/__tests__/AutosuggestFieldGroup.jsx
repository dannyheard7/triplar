import React from "react";
import {shallow} from "enzyme";

import AutosuggestFieldGroup from "../AutosuggestFieldGroup.jsx";

describe('<AutosuggestFieldGroup />', () => {
    const props = {
        suggestions: [],
        getSuggestions: jest.fn(),
        onSuggestionsClearRequested: jest.fn(),
        getSuggestionValue: jest.fn(),
        renderSuggestion: jest.fn(),
        shouldRenderSuggestions: jest.fn(),
        onChange: jest.fn(),
        value: ""
    };

    test('inputComponent renders correctly', () => {
        const container = shallow(<AutosuggestFieldGroup {...props} />);
        const inputProps = {label: "City Search", name: "city_search", errors: ["Error"]};

        expect(container.instance().renderInputComponent(inputProps)).toMatchSnapshot();
    })
});