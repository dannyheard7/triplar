import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';
import TripForm from "Trips/Components/TripForm";
import FormContainer from "Forms/Containers/FormContainer";

const renderer = new ShallowRenderer();

const faker = require('faker');

const formData = FormData;

describe('<FormContainer />', () => {
    const event = {
        preventDefault: () => {
        },
        target: {}
    };

    const onSuccess = jest.fn();

    const apiFunc = jest.fn().mockImplementation(trip => {
        return new Promise((resolve, reject) => {
            let response = {status: 200, data: {data: {result: trip}}};
            resolve(response);
        });
    });

    const props = {apiFunction: apiFunc, onSuccess: onSuccess, children: <TripForm />};

    afterEach(() => {
        apiFunc.mockClear();
        onSuccess.mockClear();
    });

    test('renders correctly', () => {
        const result = renderer.render(<FormContainer {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('calls handle submit after receiving submit from <FormContainer />', async() => {
        const spy = jest.spyOn(FormContainer.prototype, 'handleSubmit');

        let container = shallow(<FormContainer {...props}  />);
        container.instance().parseFormData = jest.fn().mockReturnValue({});

        container.find(TripForm).prop('onSubmit')(event);
        await Promise.resolve();

        expect(spy).toBeCalled();
    });

    test('calls apiFunction prop during handleSubmit()', async() => {
        let container = shallow(<FormContainer {...props}  />);
        container.instance().parseFormData = jest.fn().mockReturnValue({});

        container.instance().handleSubmit(event);
        await Promise.resolve();

        expect(apiFunc).toBeCalled();
    });

    test('calls onSuccess prop on api call success', async() => {
        let container = shallow(<FormContainer {...props}  />);
        container.instance().parseFormData = jest.fn().mockReturnValue({});

        container.find(TripForm).prop('onSubmit')(event);
        await Promise.resolve();

        expect(onSuccess).toBeCalled();
    });

    test('errors state change updates TripForm Prop', () => {
        const container = shallow(<FormContainer {...props} />);
        expect(container.find(TripForm).props().errors).toEqual(container.state('errors'));

        let errors = jest.fn();
        container.setState({errors: errors});

        expect(container.find(TripForm).props().errors).toEqual(errors);
    });

    test('unsuccesful api call updates state errors', async () => {
        const spy = jest.fn();
        const data = {result: {errors: [{field: faker.random.word(), messages: [faker.random.word()]}]}};
        const apiFunc = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
            let response = {status: 400, data: {data: data}};
            resolve(response);
        }));

        const container = shallow(<FormContainer apiFunction={apiFunc} onSuccess={onSuccess} children={TripForm}/>);
        container.instance().parseFormData = jest.fn().mockReturnValue({});

        container.instance().handleSubmit(event);
        await Promise.resolve();

        expect(spy).not.toBeCalled();
        expect(container.state('errors')).toEqual({[data.result.errors[0].field]: data.result.errors[0].messages});
    });

    test('onSuccess state.errors is set to empty object', async() => {
        let container = shallow(<FormContainer {...props}  />);
        container.instance().parseFormData = jest.fn().mockReturnValue({});

        container.find(TripForm).prop('onSubmit')(event);
        await Promise.resolve();

        expect(container.state('errors')).toEqual([]);
    });

    test.skip('parseFormData uses FormData to parse form', () =>{
        const event = {
            preventDefault: () => { },
            target: undefined
        };

        global.FormData = formData;

        let container = shallow(<FormContainer {...props}  />);

        container.instance().parseFormData(event);

        expect(formData).toBeCalled();
    });

});