import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';
import TripForm from "Trips/Components/TripForm";
import TripFormContainer from "Trips/Containers/TripFormContainer";

const renderer = new ShallowRenderer();

const faker = require('faker');

describe('<TripFormContainer />', () => {
    const event = {
        preventDefault: () => {
        },
        target: {
            value: "",
            name: "",
        },
    };

    const onSuccess = jest.fn();

    const apiFunc = jest.fn().mockImplementation(trip => {
        return new Promise((resolve, reject) => {
            let response = {status: 200, data: trip};
            resolve(response);
        });
    });

    const props = {apiFunction: apiFunc, onSuccess: onSuccess};

    afterEach(() => {
        apiFunc.mockClear();
        onSuccess.mockClear();
    });

    test('renders correctly', () => {
        const result = renderer.render(<TripFormContainer {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('calls handle change after receiving change from <TripForm />', (function () {
        const spy = jest.spyOn(TripFormContainer.prototype, 'handleChange');

        const container = shallow(<TripFormContainer {...props} />);
        container.find(TripForm).prop('onChange')(event);

        expect(spy).toBeCalled();
    }));

    test('calls handle submit after receiving submit from <TripForm />', async() => {
        const spy = jest.spyOn(TripFormContainer.prototype, 'handleSubmit');

        let container = shallow(<TripFormContainer {...props}  />);

        container.find(TripForm).prop('onSubmit')(event);
        await Promise.resolve();

        expect(spy).toBeCalled();
    });

    test('calls apiFunction prop during handleSubmit()', async() => {
        let container = shallow(<TripFormContainer {...props}  />);

        container.instance().handleSubmit(event);
        await Promise.resolve();

        expect(apiFunc).toBeCalled();
    });

    test('calls onSuccess prop on api call success', async() => {
        let container = shallow(<TripFormContainer {...props}  />);

        container.find(TripForm).prop('onSubmit')(event);
        await Promise.resolve();

        expect(onSuccess).toBeCalled();
    });

    test('updates the state when handleChange is called', () => {
        const container = shallow(<TripFormContainer {...props} />);
        const instance = container.instance();
        const name = faker.random.word();

        instance.handleChange({'target': {'name': 'name', 'value': name}});
        expect(container.state('trip').name).toEqual(name);
    });

    test('errors state change updates TripForm Prop', () => {
        const container = shallow(<TripFormContainer {...props} />);
        expect(container.find(TripForm).props().errors).toEqual(container.state('errors'));

        let errors = jest.fn();
        container.setState({errors: errors});

        expect(container.find(TripForm).props().errors).toEqual(errors);
    });

    test('unsuccesful api call updates state errors', async () => {
        const spy = jest.fn();
        let trip = {'id': faker.random.number(), 'name': faker.random.word()};
        const errors = [faker.random.word(), faker.random.word()];
        const apiFunc = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
            let response = {status: 400, data: errors};
            resolve(response);
        }));

        const container = shallow(<TripFormContainer apiFunction={apiFunc} onSuccess={onSuccess} trip={trip}/>);
        container.instance().handleSubmit(event);
        await Promise.resolve();

        expect(spy).not.toBeCalled();
        expect(container.state('errors')).toEqual(errors);
    });

});