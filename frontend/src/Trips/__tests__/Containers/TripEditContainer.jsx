import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();

import {TripEditContainer} from "Trips/Containers/TripEditContainer";
import FormContainer from "Forms/Containers/FormContainer";

jest.mock('Trips/utils/trips.api.js');
const api = require('Trips/utils/trips.api.js');
const faker = require('faker');

describe('<TripEditContainer />', () => {
    test('renders correctly', () => {
        const result = renderer.render(<TripEditContainer />);
        expect(result).toMatchSnapshot();
    });

    test.skip('editTrip called with correct arguments', () => {
        const spy = jest.spyOn(api.default, 'editTrip');
        const trip = {id: faker.random.number(), name: faker.random.word()};

        const container = shallow(<TripEditContainer  trip={trip} />);
        container.instance().apiFunc(trip);

        expect(spy).toBeCalledWith(trip.id, trip);

        spy.mockRestore();
    });
});