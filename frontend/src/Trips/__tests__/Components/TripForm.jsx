import React from "react";

import TripForm from "Trips/Components/TripForm";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();


describe('<TripForm />', () => {
    const props = {
        object: {},
        errors: {}
    };

    test('renders correctly', () => {
        const result = renderer.render(<TripForm {...props} />);
        expect(result).toMatchSnapshot();
    });
});