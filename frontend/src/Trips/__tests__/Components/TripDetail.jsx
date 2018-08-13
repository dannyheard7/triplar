import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();

import TripDetail from "Trips/Components/TripDetail";

const faker = require('faker');

describe('<TripDetail />', () => {
    describe('with no trip prop', () => {
        test.skip('displays no <ListGroupItem /> component', () => {
        });
    });

    describe('with trip prop', () => {
        let trip = null;

        beforeAll(function () {
            trip = {'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email(),
            'locations': [faker.address.city()]};
        });

        test('renders correctly', () => {
            trip = {'id': 1, 'name': "test", 'created_by': "email@example.com", 'locations': ["Bristol"],
                    'start_date': "2018-08-10", "end_date": "2018-08-12"};
            const result = renderer.render(<TripDetail trip={trip}/>);
            expect(result).toMatchSnapshot();
        });

        test('displays the trip name', () => {
            const container = shallow(<TripDetail trip={trip}/>);
            expect(container.find("#trip-name").text()).toEqual(trip['name']);
        });

       test('displays the trip creator', () => {
            const container = shallow(<TripDetail trip={trip}/>);
            expect(container.find("#created-by").text()).toEqual('Created by: ' + trip['created_by']);
        });

        test('updates when trip prop changes', () => {
            const container = shallow(<TripDetail trip={trip}/>);
            let newTrip = {
                'id': faker.random.number(),
                'name': faker.random.word(),
                'created_by': faker.internet.email(),
                'locations': [faker.address.city()]
            };
            container.setProps({trip: newTrip});
            expect(container.find("#trip-name").text()).toEqual(newTrip['name']);
        })
    });
});