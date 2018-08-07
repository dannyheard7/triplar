import React from "react";
import {mount, shallow} from "enzyme";
import api from "utils/api.js";

import TripListContainer from "Trips/Containers/TripListContainer";
import TripList from "Trips/Components/TripList";

const faker = require('faker');

jest.mock('utils/api.js');
describe('<TripListContianer />', () => {

    test('renders a <TripList /> object', () => {
        const container = shallow(<TripListContainer />);
        expect(container.find(TripList).length).toEqual(1);
    });

    it('updates state after receiving trip from props', () => {
        const container = shallow(<TripListContainer />);
        let trip = jest.fn();

        container.setProps({createdTrip: trip});
        expect(container.state('trips')).toEqual([trip]);
    });

    it('retains old trips after receiving new trip from props', () => {
        const container = shallow(<TripListContainer />);

        let trips = [faker.random.word()];
        container.setState({trips: trips});

        let newTrip = faker.random.word();
        container.setProps({createdTrip: newTrip});

        expect(container.state('trips')).toEqual(trips.concat([newTrip]));
    });
    test('sets trips returned from server as state on mount', async () => {
        let trips = [faker.random.word(), faker.random.word()];

        // Need to refactor into a better way of changes mocks for a single test
        api.getTrips = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
            let response = {status: 200, data: trips};
            resolve(response);
        }));

        const container = shallow(<TripListContainer />);
        await Promise.resolve();

        expect(container.state('trips')).toEqual(trips);
    });

});