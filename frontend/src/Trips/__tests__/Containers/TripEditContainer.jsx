import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();

import TripEditContainer from "Trips/Containers/TripEditContainer";
import TripFormContainer from "../../Containers/TripFormContainer";

describe('<TripEditContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    test('renders correctly', () => {
        const result = renderer.render(<TripEditContainer />);
        expect(result).toMatchSnapshot();
    });

    test('calls onSuccess after receiving success from <TripFormContainer />', (function () {
        const stub = jest.spyOn(TripEditContainer.prototype, 'onSuccess');

        const container = shallow(<TripEditContainer onUpdate={jest.fn()}/>);
        container.find(TripFormContainer).prop('onSuccess')(event);

        expect(stub).toBeCalled();
    }));


});