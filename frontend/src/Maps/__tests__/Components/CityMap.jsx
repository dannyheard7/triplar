import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import {shallow} from "enzyme";
import {Map} from 'react-leaflet'

const renderer = new ShallowRenderer();
const faker = require('faker');

import CityMap from "Maps/Components/CityMap";


describe('<CityMap />', () => {
    test('renders correctly', () => {
        let city = {name_std: "Bristol", country: "United Kingdom", location: {lat: 0.0, lng: 0.0} };
        const result = renderer.render(<CityMap city={city}/>);
        expect(result).toMatchSnapshot();
    });

    test("City's lat lng are set as Map child center prop correctly", () => {
        let city = {name_std: faker.address.city(), country: faker.address.country(), location: {lat: faker.address.latitude(),
            lng: faker.address.longitude()}};
        let center = [city.location.lat, city.location.lng];

        let cityMapWrapper = shallow(<CityMap city={city} />);
        let map = cityMapWrapper.find(Map);

        expect(map.props().center).toEqual(center);
    })
});
