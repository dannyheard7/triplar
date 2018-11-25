import React from "react";
import {shallow} from "enzyme";
import {TripDetailContainer} from "Trips/Containers/TripDetailContainer";
import LoadingIndicator from "App/Components/LoadingIndicator";

import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();
const faker = require('faker');

const api = require('Trips/utils/trips.api.js');

describe('<TripDetailContainer />', () => {
    const props = {
        trip: {'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()},
        match: {params: {id: faker.random.number()}}
    };

    test('renders loading text when no trip is passed', async () => {
        let container = shallow(<TripDetailContainer {...props} trip={null} />);
        expect(container.find(LoadingIndicator).length).toEqual(1);
        container = shallow(<TripDetailContainer {...props}  />);
        expect(container.find(LoadingIndicator).length).toEqual(0);
    });


    // Move to redux tests
    test.skip('response from api call is set as state', async () => {
        const stub = jest.spyOn(api.default, "getTripDetail");
        const trip = {'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()};
        stub.mockReturnValueOnce(Promise.resolve({status: 200, data: {data: {trip: trip}}}));

        const container = shallow(<TripDetailContainer {...props} match={{params: {id: trip.id}}} />);
        await Promise.resolve();

        expect(stub).toBeCalledWith(trip.id);
        expect(container.state('trip')).toEqual(trip);

        stub.mockRestore(); // Changed the mock so restore it to original
    });

    test.skip("Renders trip not found on trips that don't exist", () => {

    });

    test('With a trip object renders correctly', () => {
        const trip = {'id': 1, 'name': "New Trip", 'created_by': "Danny Heard"};
        const result = renderer.render(<TripDetailContainer trip={trip} />);
        expect(result).toMatchSnapshot();
    });

});