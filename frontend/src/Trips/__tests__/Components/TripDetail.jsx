import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();

import TripDetail from "Trips/Components/TripDetail";

const faker = require('faker');

describe('<TripDetail />', () => {
      describe('with trip prop', () => {
        let trip = null;

        beforeAll(function () {
            // TODO: Need a better way to deal with this. Maybe a helper function that generates one?
            trip = {'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email(),
            'locations': [{'id': faker.random.number, 'city': {'name_std': faker.address.city(), 'country': faker.address.country()}}]};
        });

        test('renders correctly', () => {
            trip = {'id': 1, 'name': "test", 'created_by': "email@example.com", 'startDate': "2018-08-10",
                "endDate": "2018-08-12", 'locations': [{'id': 1, 'city': {'name_std': "Bristol", 'country': "United Kingdom"}}]};
            const result = renderer.render(<TripDetail trip={trip}/>);
            expect(result).toMatchSnapshot();
        });

        test('displays the trip name', () => {
            const container = shallow(<TripDetail trip={trip}/>);
            expect(container.find("#trip-name").text()).toEqual(trip['name']);
        });

       test('displays the trip creator', () => {
            const container = shallow(<TripDetail trip={trip}/>);
            expect(container.find(".created-by").text()).toEqual('Created by: ' + trip['created_by']);
        });

        test('updates when trip prop changes', () => {
            const container = shallow(<TripDetail trip={trip}/>);
            let newTrip = {
                'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email(),
                'locations': [{'id': faker.random.number, 'city': {'name_std': faker.address.city(), 'country': faker.address.country()}}]
            };
            container.setProps({trip: newTrip});
            expect(container.find("#trip-name").text()).toEqual(newTrip['name']);
        })
    });
});