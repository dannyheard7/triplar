import React from "react";
import {shallow} from "enzyme";

import TripList from "Trips/Components/TripList";

import {ListGroupItem} from "react-bootstrap";

const faker = require('faker');
const expect = require('chai').expect;

describe('<TripList />', () => {
    describe('with no trips prop',() => {
        it('displays no <ListGroupItem /> component', () => {
            const container = shallow(<TripList />);
            expect(container.find(ListGroupItem)).to.have.length(0);
        });
    });

    describe('with trips prop',() => {
        let trips = null;

        beforeEach(function() {
            trips = [{'id': faker.random.number(), 'name': faker.random.word()}];
        });

        it('displays a <ListGroupItem /> component for a single trip', () => {
            const container = shallow(<TripList trips={trips} />);
            expect(container.find(ListGroupItem)).to.have.length(trips.length);
        });

        it('updates on new trip props', () => {
            const container = shallow(<TripList trips={trips}/>);
            expect(container.find(ListGroupItem)).to.have.length(trips.length);

            let newTrips = [{'id': faker.random.number(), 'name': faker.random.word()},
                {'id': faker.random.number(), 'name': faker.random.word()}];
            container.setProps({trips: newTrips});
            expect(container.find(ListGroupItem)).to.have.length(newTrips.length);
        });
    });
});