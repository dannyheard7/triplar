import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();

import TripCreateContainer from "Trips/Containers/TripCreateContainer";
import TripFormContainer from "Trips/Containers/TripFormContainer";

describe('<TripCreateContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    test('renders correctly', () => {
        const result = renderer.render(<TripCreateContainer />);
        expect(result).toMatchSnapshot();
    });

    test('calls onSuccess after receiving success from <TripFormContainer />', (function () {
        const stub = jest.spyOn(TripCreateContainer.prototype, 'onSuccess');

        const container = shallow(<TripCreateContainer onTripCreate={jest.fn()}/>);
        container.find(TripFormContainer).prop('onSuccess')(event);

        expect(stub).toBeCalled();
    }));

});