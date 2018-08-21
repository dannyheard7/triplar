import React from "react";
import {mount, shallow} from "enzyme";
import api from "Trips/utils/trips.api.js";

import TripListContainer from "Trips/Containers/TripListContainer";
import TripList from "Trips/Components/TripList";

const faker = require('faker');

jest.mock('Trips/utils/trips.api.js');
describe('<TripListContianer />', () => {

    test('renders a <TripList /> object', () => {
        const container = shallow(<TripListContainer />);
        expect(container.find(TripList).length).toEqual(1);
    });

    test('calls getTrips after receiving update signal from props', () => {
        const container = shallow(<TripListContainer />);
        container.instance().getTrips = jest.fn();
        container.setProps({update: true});

        expect(container.instance().getTrips).toBeCalled();
    });

    test('calls getTrips on mount', () => {
        const spy = jest.spyOn(TripListContainer.prototype, "getTrips");
        const container = shallow(<TripListContainer />);

        expect(spy).toBeCalled();
    });

    test('update sets trips returned from server as state', async () => {
        let trips = [faker.random.word(), faker.random.word()];

        // Need to refactor into a better way of changes mocks for a single test
        api.getTrips = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
            let response = {status: 200, data: {data: {trips: trips}}};
            resolve(response);
        }));

        const container = shallow(<TripListContainer />);
        await Promise.resolve();

        expect(container.state('trips')).toEqual(trips);
    });

});