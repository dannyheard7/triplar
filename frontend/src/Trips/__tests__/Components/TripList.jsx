import React from "react";
import {shallow} from "enzyme";

import TripList from "Trips/Components/TripList";


const faker = require('faker');

describe('<TripList />', () => {
    describe('with no trips prop',() => {
        it('displays no <ListGroupItem /> component', () => {
            const container = shallow(<TripList />);
            expect(container.find(".trip-card").length).toEqual(0);
        });
    });

    describe('with trips prop',() => {
        let trips = null;

        beforeEach(function() {
            trips = [{'id': faker.random.number(), 'name': faker.random.word(), 'locations': [faker.address.city()]}];
        });

        it('displays a <ListGroupItem /> component for a single trip', () => {
            const container = shallow(<TripList trips={trips} />);
            expect(container.find(".trip-card").length).toEqual(trips.length);
        });

        it('updates on new trip props', () => {
            const container = shallow(<TripList trips={trips}/>);
            expect(container.find(".trip-card").length).toEqual(trips.length);

            let newTrips = [{'id': faker.random.number(), 'name': faker.random.word(), 'locations': [faker.address.city()]},
                {'id': faker.random.number(), 'name': faker.random.word(), 'locations': [faker.address.city()]}];
            container.setProps({trips: newTrips});
            expect(container.find(".trip-card").length).toEqual(newTrips.length);
        });
    });
});