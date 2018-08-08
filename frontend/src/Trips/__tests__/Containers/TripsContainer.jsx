import React from "react";
import {shallow} from "enzyme";

import TripListContainer from "Trips/Containers/TripListContainer";
import TripCreateContainer from "Trips/Containers/TripCreateContainer";
import TripsContainer from "Trips/Containers/TripsContainer";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();

describe('<TripsContainer />', () => {
    let overview = null;
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    beforeEach(function () {
        overview = shallow(<TripsContainer />);
    });

    test('renders a <TripListContainer /> component', () => {
        const result = renderer.render(<TripListContainer  />);
        expect(result).toMatchSnapshot();
    });

    describe('trip create visible', () => {
        beforeEach(function () {
            overview.setState({showTripCreate: true});
        });

        it('renders <TripCreateContainer /> component when tripCreateVisible is true', () => {
            expect(overview.find(TripCreateContainer).length).toEqual(1);
        });

        it('updates state.tripCreateVisible when create button clicked', () => {
            overview.find('.btn').simulate('click');
            expect(overview.state('showTripCreate')).toEqual(false);
        });

        it('does not render <TripCreateContainer /> after a trip has been created', () => {
            expect(overview.find(TripCreateContainer).length).toEqual(1);
            overview.find(TripCreateContainer).prop('onTripCreate')(event);
            overview.update();

            expect(overview.state('showTripCreate')).toEqual(false);
            expect(overview.find(TripCreateContainer).length).toEqual(0);
        });

        it('The state contains the new trip from <TripCreateContainer /> after a trip has been created', () => {
            let trip = jest.fn();
            overview.find(TripCreateContainer).prop('onTripCreate')(trip);

            expect(overview.state('createdTrip')).toEqual(trip);
        });
    });

    it('createdTrip state change updates TripListContainer Prop', function () {
        const container = shallow(<TripsContainer />);
        expect(container.find(TripListContainer).props().createdTrip).toEqual(container.state('createdTrip'));

        let createdTrip = jest.fn();
        container.setState({createdTrip: createdTrip});
        expect(container.find(TripListContainer).props().createdTrip).toEqual(createdTrip);
    });

    test.skip('Once trip has been created, all state of the new trip is cleared', () => {

    })
});