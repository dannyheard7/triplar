import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
import {TripCreate} from "../TripCreate";
import ReduxFormContainer from "../../../Forms/Containers/ReduxFormContainer";

const renderer = new ShallowRenderer();

const faker = require('faker');

describe('<TripCreateContainer />', () => {
    const data = {trip: {id: faker.random.number()}};

    const props = {
        dispatch: jest.fn()
    };

    test('renders correctly', () => {
        const result = renderer.render(<TripCreate {...props} />);
        expect(result).toMatchSnapshot();
    });

    // TODO
    test.skip('calls onSuccess after receiving success from <ReduxFormContainer />', (function () {
        const stub = jest.spyOn(TripCreate.prototype, 'onSuccess');
        const container = shallow(<TripCreate  {...props}/>);
        container.setState({showTripCreate: true});
        container.find(ReduxFormContainer).prop('onSuccess')(data);

        expect(stub).toBeCalled();
        expect(props.history.push).toBeCalledWith('/trips/' + data.trip.id);
    }));

    // TODO
    test.skip('onSuccess redirects to trip page', (function () {
        const container = shallow(<TripCreate  {...props}/>);
        container.instance().onSuccess(data);

        expect(props.history.push).toBeCalledWith('/trips/' + data.trip.id);
    }));

    describe('trip create visible', () => {
        let container = null;

        beforeEach(() => {
            container = shallow(<TripCreate  {...props}/>);
            container.setState({showTripCreate: true});
        });

        test('renders <ReduxFormContainer /> component when showTripCreate is true', () => {
            expect(container.find(ReduxFormContainer).length).toEqual(1);
        });

        test('updates state.showTripCreate when create button clicked', () => {
            container.find('.btn').simulate('click');
            expect(container.state('showTripCreate')).toBeFalsy();
        });

        // TODO
        test.skip('does not render <ReduxFormContainer /> after a trip has been created', () => {
            expect(container.find(ReduxFormContainer).length).toEqual(1);
            container.find(ReduxFormContainer).prop('onSuccess')(data);
            container.update();

            expect(container.state('showTripCreate')).toEqual(false);
            expect(container.find(ReduxFormContainer).length).toEqual(0);
        });
    });

});