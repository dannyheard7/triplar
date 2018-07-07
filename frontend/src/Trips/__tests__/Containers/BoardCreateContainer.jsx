import React from "react";
import {shallow} from "enzyme";
import sinon from "sinon";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import TripCreateContainer from "Trips/Containers/TripCreateContainer";
import TripForm from "Trips/Components/TripForm";

const faker = require('faker');
const expect = require('chai').expect;


describe('<TripCreateContainer />', () => {
    it('calls handle submit after receiving submit from <TripForm />', sinon.test(function () {
        let stub = this.stub(TripCreateContainer.prototype, 'handleSubmit');

        const container = shallow(<TripCreateContainer />);
        container.find(TripForm).prop('onSubmit')();

        expect(stub.called).to.be.true;
    }));

    it('calls handle change after receiving change from <TripForm />', sinon.test(function () {
        let stub = this.stub(TripCreateContainer.prototype, 'handleChange');

        const container = shallow(<TripCreateContainer />);
        container.find(TripForm).prop('onChange')();

        expect(stub.called).to.be.true;
    }));

    it('renders a <TripForm /> object', () => {
        const container = shallow(<TripCreateContainer />);
        expect(container.find(TripForm)).to.have.length(1);
    });

    it('updates the state when handleChange is called', () => {
        const container = shallow(<TripCreateContainer />);
        const instance = container.instance();
        const name = faker.random.word();

        instance.handleChange({'target': {'name': 'name', 'value': name}});
        expect(container.state('trip').name).to.equal(name);
    });

    describe('api', () => {
        before(function () {
            axios.defaults.validateStatus = function (status) {
                return (status >= 200 && status < 300) || (status == 400)
            };
        });

        beforeEach(function () {
            this.mockAdapter = new MockAdapter(axios);
        });

        it('succesful trip create calls onTripCreate prop', function (done) {
            const spy = sinon.spy();
            const container = shallow(<TripCreateContainer onTripCreate={spy}/>);

            container.setState({'name': faker.random.word()});
            this.mockAdapter.onPost('/trips/').reply(201, sinon.mock());

            container.instance().create();

            setTimeout(() => {
                expect(spy.called).to.be.true;
                done();
            }, 0);
        });

        it('unsuccesful trip create updates state errors', function (done) {
            const spy = sinon.spy();
            const container = shallow(<TripCreateContainer onTripCreate={spy}/>);
            container.setState({'name': faker.random.word()});

            const errors = sinon.mock();
            this.mockAdapter.onPost('/trips/').reply(400, errors);
            container.instance().create();

            setTimeout(() => {
                expect(container.state('errors')).to.equal(errors);
                expect(spy.called).to.be.false;
                done();
            }, 0);
        });
    });

    it('errors state change updates TripForm Prop', function () {
        const container = shallow(<TripCreateContainer />);
        expect(container.find(TripForm).props().errors).to.equal(container.state('errors'));

        let errors = sinon.mock();
        container.setState({errors: errors});

        expect(container.find(TripForm).props().errors).to.equal(errors);
    });
});