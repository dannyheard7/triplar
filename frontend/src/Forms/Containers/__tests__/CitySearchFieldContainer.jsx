import React from "react";
import {shallow} from "enzyme";
import api from "../../../Itinerary/utils/itinerary.api.js";

import CitySearchFieldContainer from "../CitySearchFieldContainer.jsx";

const faker = require('faker');
jest.mock('../../../Itinerary/utils/itinerary.api.js');

describe('<CitySearchFieldContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    test('onChange updates state with value', () => {
        const value = faker.address.city();

        const container = shallow(<CitySearchFieldContainer onChange={jest.fn()} />);
        container.instance().onChange(event, {newValue: value});

        expect(container.state('value')).toEqual(value);
    });

    test('shouldRenderSuggestions returns true with >2 characters', () => {
        const shortValue = "ab";
        const adequateValue = "abc";
        const longValue = "abcdefghijklmnopqrstuvwxyz";

        const container = shallow(<CitySearchFieldContainer />);

        expect(container.instance().shouldRenderSuggestions(shortValue)).toBeFalsy();
        expect(container.instance().shouldRenderSuggestions(adequateValue)).toBeTruthy();
        expect(container.instance().shouldRenderSuggestions(longValue)).toBeTruthy();
    });

    test('onSuggestionsClearRequested clears suggestions in state', () => {
        const container = shallow(<CitySearchFieldContainer />);
        const suggestions = [faker.address.city(), faker.address.city()];
        container.setState({suggestions: suggestions});

        expect(container.state('suggestions')).toEqual(suggestions);

        container.instance().onSuggestionsClearRequested();
        expect(container.state('suggestions')).toEqual([]);
    });

    test('getSuggestions sets suggestions returned from api in state', async () => {
        const container = shallow(<CitySearchFieldContainer />);
        const suggestions =  [faker.address.city(), faker.address.city()];

        api.searchCities = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({status: 200, data: {data: {cities: suggestions}}});
        }));

        container.instance().getSuggestions({value: faker.address.city()});
        await Promise.resolve();

        expect(container.state('suggestions')).toEqual(suggestions);
    });

    test('getSuggestionValue returns city name', async () => {
        const container = shallow(<CitySearchFieldContainer />);
        const suggestion = {name: faker.address.city(), country: {name: faker.address.country()}};

        const suggestionValue = container.instance().getSuggestionValue(suggestion);
        await Promise.resolve();

        expect(suggestionValue).toEqual(suggestion.name + ", " + suggestion.country.name);
    });



});