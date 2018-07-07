import React from "react";
import {shallow} from "enzyme";
import sinon from "sinon";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import TripEditContainer from "Trips/Containers/TripEditContainer";
import TripForm from "Trips/Components/TripForm";

const faker = require('faker');
const expect = require('chai').expect;


describe('<TripEditContainer />', () => {
    it('renders a <TripForm /> object', () => {
        const container = shallow(<TripEditContainer />);
        expect(container.find(TripForm)).to.have.length(1);
    });

    it('calls handle submit after receiving submit from <TripForm />', sinon.test(function () {
        let stub = this.stub(TripEditContainer.prototype, 'handleSubmit');

        const container = shallow(<TripEditContainer />);
        container.find(TripForm).prop('onSubmit')();

        expect(stub.called).to.be.true;
    }));

    it('calls handle change after receiving change from <TripForm />', sinon.test(function () {
        let stub = this.stub(TripEditContainer.prototype, 'handleChange');

        const container = shallow(<TripEditContainer />);
        container.find(TripForm).prop('onChange')();

        expect(stub.called).to.be.true;
    }));

    it('updates the state when handleChange is called', () => {
        const container = shallow(<TripEditContainer />);
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

        it('succesful trip update calls onUpdate props function', function (done) {
            const spy = sinon.spy();
            let trip = {'id': faker.random.number(), 'name': faker.random.word()};
            const container = shallow(<TripEditContainer onUpdate={spy} trip={trip}/>);

            container.setState({'name': faker.random.word()});
            this.mockAdapter.onPatch('/trips/' + trip['id']).reply(200, sinon.mock());

            container.instance().update();

            setTimeout(() => {
                expect(spy.called).to.be.true;
                done();
            }, 0);
        });

        it('unsuccesful trip update updates state errors', function (done) {
            const spy = sinon.spy();
            let trip = {'id': faker.random.number(), 'name': faker.random.word()};

            const container = shallow(<TripEditContainer onUpdate={spy} trip={trip}/>);
            container.setState({'name': faker.random.word()});

            const errors = sinon.mock();
            this.mockAdapter.onPatch('/trips/' + trip['id']).reply(400, errors);

            container.instance().update();

            setTimeout(() => {
                expect(spy.called).to.be.false;
                expect(container.state('errors')).to.equal(errors);
                done();
            }, 0);
        });
    });

    it('errors state change updates TripForm Prop', function () {
        const container = shallow(<TripEditContainer />);
        expect(container.find(TripForm).props().errors).to.equal(container.state('errors'));

        let errors = sinon.mock();
        container.setState({errors: errors});

        expect(container.find(TripForm).props().errors).to.equal(errors);
    });
});