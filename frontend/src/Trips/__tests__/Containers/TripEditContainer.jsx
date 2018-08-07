import React from "react";
import {shallow} from "enzyme";
import api from "utils/api.js";

import TripEditContainer from "Trips/Containers/TripEditContainer";
import TripForm from "Trips/Components/TripForm";

const faker = require('faker');


describe('<TripEditContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    test('renders a <TripForm /> object', () => {
        const container = shallow(<TripEditContainer />);
        expect(container.find(TripForm).length).toEqual(1);
    });

    test('calls handle submit after receiving submit from <TripForm />', () => {
        const stub = jest.spyOn(TripEditContainer.prototype, 'handleSubmit');

        const container = shallow(<TripEditContainer />);
        container.find(TripForm).prop('onSubmit')(event);

        expect(stub).toBeCalled();
    });

    test('calls handle change after receiving change from <TripForm />', () => {
        const stub = jest.spyOn(TripEditContainer.prototype, 'handleChange');

        const container = shallow(<TripEditContainer />);
        container.find(TripForm).prop('onChange')(event);

        expect(stub).toBeCalled();
    });

    test('updates the state when handleChange is called', () => {
        const container = shallow(<TripEditContainer />);
        const instance = container.instance();
        const name = faker.random.word();

        instance.handleChange({'target': {'name': 'name', 'value': name}});
        expect(container.state('trip').name).toEqual(name);
    });

    test('errors state change updates TripForm Prop', () => {
        const container = shallow(<TripEditContainer />);
        expect(container.find(TripForm).props().errors).toEqual(container.state('errors'));

        let errors = jest.fn();
        container.setState({errors: errors});

        expect(container.find(TripForm).props().errors).toEqual(errors);
    });

    describe('api', () => {
        it('succesful trip update calls onUpdate props function', async () => {
            const spy = jest.fn();
            let trip = {'id': faker.random.number(), 'name': faker.random.word()};

            api.patchTrip = jest.fn().mockImplementationOnce(trip => {
                return new Promise((resolve, reject) => {
                    let response = {status: 200, data: trip};
                    resolve(response);
                });
            });

            const container = shallow(<TripEditContainer onUpdate={spy} trip={trip}/>);

            container.setState({'name': faker.random.word()});
            container.instance().update();
            await Promise.resolve();

            expect(spy).toBeCalled();
        });

        it('unsuccesful trip update updates state errors', async () => {
            const spy = jest.fn();
            let trip = {'id': faker.random.number(), 'name': faker.random.word()};
            const errors = [faker.random.word(), faker.random.word()];
            api.patchTrip = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
                let response = {status: 400, data: errors};
                resolve(response);
            }));

            const container = shallow(<TripEditContainer onUpdate={spy} trip={trip}/>);
            container.instance().update();
            await Promise.resolve();

            expect(spy).not.toBeCalled();
            expect(container.state('errors')).toEqual(errors);
        });
    });
});