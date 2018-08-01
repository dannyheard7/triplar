import React from "react";
import {mount, shallow} from "enzyme";
import mockAxios from 'jest-mock-axios';

import TripListContainer from "Trips/Containers/TripListContainer";
import TripList from "Trips/Components/TripList";

const faker = require('faker');

describe('<TripListContianer />', () => {

    test('renders a <TripList /> object', () => {
        const container = shallow(<TripListContainer />);
        expect(container.find(TripList).length).toEqual(1);
    });

    it('request trips from the server on mount', function(done) {
        let trips = [faker.random.word(), faker.random.word()];
        const container = mount(<TripListContainer />);

        let responseObj = {status: 200, data: trips};
        mockAxios.mockResponse(responseObj);

        expect(container.state('trips')).toEqual(trips);
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
});