import React from "react";
import {shallow} from "enzyme";

import TripDetail from "Trips/Components/TripDetail";

const faker = require('faker');
const expect = require('chai').expect;

describe('<TripDetail />', () => {
    describe('with no trip prop', () => {
        it('displays no <ListGroupItem /> component', () => {
        });
    });

    describe('with trip prop', () => {
        let trip = null;

        before(function () {
            trip = {'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()};
        });

        it('displays the trip name', () => {
            const container = shallow(<TripDetail trip={trip}/>);
            expect(container.find("#trip-name").text()).to.equal(trip['name']);
        });

        it('displays the trip creator', () => {
            const container = shallow(<TripDetail trip={trip}/>);
            expect(container.find("#created-by").text()).to.equal('Created by: ' + trip['created_by']);
        });

        it('updates when trip prop changes', () => {
            const container = shallow(<TripDetail trip={trip}/>);
            let newTrip = {
                'id': faker.random.number(), 'name': faker.random.word(),
                'created_by': faker.internet.email()
            };
            container.setProps({trip: newTrip});
            expect(container.find("#trip-name").text()).to.equal(newTrip['name']);
        })
    });
});