import React from "react";
import {shallow} from "enzyme";
import sinon from "sinon";

import TripListContainer from "Trips/Containers/TripListContainer";
import TripCreateContainer from "Trips/Containers/TripCreateContainer";
import TripsContainer from "Trips/Containers/TripsContainer";

const expect = require('chai').expect;

describe('<TripsContainer />', () => {
    let overview = null;

    beforeEach(function () {
        overview = shallow(<TripsContainer />);
    });

    it('renders a <TripListContainer /> component', () => {
        expect(overview.find(TripListContainer)).to.have.length(1);
    });

    it('does not render <TripCreateContainer /> component when tripCreateVisible is false', () => {
        expect(overview.find(TripCreateContainer)).to.have.length(0);
    });

    describe('trip create visible', () => {
        beforeEach(function () {
            overview.setState({showTripCreate: true});
        });

        it('renders <TripCreateContainer /> component when tripCreateVisible is true', () => {
            expect(overview.find(TripCreateContainer)).to.have.length(1);
        });

        it('updates state.tripCreateVisible when create button clicked', () => {
            overview.find('Button').simulate('click');
            expect(overview.state('showTripCreate')).to.equal(false);
        });

        it('does not render <TripCreateContainer /> after a trip has been created', () => {
            expect(overview.find(TripCreateContainer)).to.have.length(1);
            overview.find(TripCreateContainer).prop('onTripCreate')();

            expect(overview.state('showTripCreate')).to.equal(false);
            expect(overview.find(TripCreateContainer)).to.have.length(0);
        });

        it('The state contains the new trip from <TripCreateContainer /> after a trip has been created', () => {
            let trip = sinon.mock();
            overview.find(TripCreateContainer).prop('onTripCreate')(trip);

            expect(overview.state('createdTrip')).to.equal(trip);
        });
    });

    it('createdTrip state change updates TripListContainer Prop', function () {
        const container = shallow(<TripsContainer />);
        expect(container.find(TripListContainer).props().createdTrip).to.equal(container.state('createdTrip'));

        let createdTrip = sinon.mock();
        container.setState({createdTrip: createdTrip});
        expect(container.find(TripListContainer).props().createdTrip).to.equal(createdTrip);
    });
});