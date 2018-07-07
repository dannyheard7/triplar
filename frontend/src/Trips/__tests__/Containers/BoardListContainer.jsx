import React from "react";
import {mount, shallow} from "enzyme";
import sinon from "sinon";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import TripListContainer from "Trips/Containers/TripListContainer";
import TripList from "Trips/Components/TripList";

const expect = require('chai').expect;


describe('<TripListContianer />', () => {

    it('renders a <TripList /> object', () => {
        const container = shallow(<TripListContainer />);
        expect(container.find(TripList)).to.have.length(1);
    });

    it('request trips from the server on mount', function(done) {
        let mockAdapter = new MockAdapter(axios);
        let trips = sinon.mock();
        mockAdapter.onGet('/trips/').reply(200, trips);

        const container = mount(<TripListContainer />);

        setTimeout(() => {
            expect(container.state('trips')).to.equal(trips);
            done();
        }, 0);
    });

    it('updates state after receiving trip from props', () => {
        const container = shallow(<TripListContainer />);
        let trip = sinon.mock();

        container.setProps({createdTrip: trip});
        expect(container.state('trips')).to.eql([trip]);
    });

    it('retains old trips after receiving new trip from props', () => {
        const container = shallow(<TripListContainer />);

        let trips = [sinon.mock()];
        container.setState({trips: trips});

        let newTrip = sinon.mock();
        container.setProps({createdTrip: newTrip});

        expect(container.state('trips')).to.eql(trips.concat([newTrip]));
    });
});