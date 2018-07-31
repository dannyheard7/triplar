import React from "react";
import {shallow} from "enzyme";
import sinon from "sinon";

import TripDetail from "Trips/Components/TripDetail";
import TripEditContainer from "Trips/Containers/TripEditContainer";
import TripDelete from "Trips/Components/TripDelete";
import TripManagementRow from "Trips/Components/TripManagementRow";
import TripDetailContainer from "Trips/Containers/TripDetailContainer";

const expect = require('chai').expect;

describe('<TripDetailContainer />', () => {
    it('only renders loading text without a trip object', () => {
        const container = shallow(<TripDetailContainer />);
        expect(container.children()).to.have.length(1);
        expect(container.text()).to.equal('Loading');
    });

    describe('With a trip object', () => {
        let container = null;
        const trip = sinon.mock();

        beforeEach(function () {
            container = shallow(<TripDetailContainer />);
            container.setState({trip: trip});
        });

        it('renders a <TripDetail /> component', () => {
            expect(container.find(TripDetail)).to.have.length(1);
        });

        it('renders a <TripManagementRow /> component ', () => {
            expect(container.find(TripManagementRow)).to.have.length(1);
        });

        it('trip state change updates TripDetail Prop', function () {
            expect(container.find(TripDetail).props().trip).to.equal(trip);

            let newTrip = sinon.mock();
            container.setState({trip: newTrip});

            expect(container.find(TripDetail).props().trip).to.equal(newTrip);
        });

        describe('edit mode', () => {
            beforeEach(function () {
                container.setState({edit: true});
            });

            it('renders <TripEditContainer /> component', () => {
                expect(container.find(TripEditContainer)).to.have.length(1);
            });

            it('does not render <TripDetail /> component', () => {
                expect(container.find(TripDetail)).to.have.length(0);
            });

            it('does not render <TripEditContainer /> after a trip has been updated', () => {
                expect(container.find(TripEditContainer)).to.have.length(1);
                container.find(TripEditContainer).prop('onUpdate')();

                expect(container.state('edit')).to.equal(false);
                expect(container.find(TripEditContainer)).to.have.length(0);
            });

            it('the trip is updated from <TripEditContainer /> after an edit', () => {
                let newTrip = sinon.mock();
                container.find(TripEditContainer).prop('onUpdate')(newTrip);
                expect(container.state('trip')).to.equal(newTrip);
            });

            it('trip state change updates TripEdit Prop', function () {
                expect(container.find(TripEditContainer).props().trip).to.equal(trip);

                let newTrip = sinon.mock();
                container.setState({trip: newTrip});

                expect(container.find(TripEditContainer).props().trip).to.equal(newTrip);
            });
        });

        describe('delete mode', () => {
            beforeEach(function () {
                container.setState({delete: true});
            });

            it('renders a <TripDelete /> component', () => {
                expect(container.find(TripDelete)).to.have.length(1);
            });

            it('trip state change updates TripDelete Prop', function () {
                expect(container.find(TripDelete).props().trip).to.equal(trip);

                let newTrip = sinon.mock();
                container.setState({trip: newTrip});

                expect(container.find(TripDelete).props().trip).to.equal(newTrip);
            });
        });
    });

});