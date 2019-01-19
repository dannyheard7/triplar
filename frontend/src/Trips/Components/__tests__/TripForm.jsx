import React from "react";

import TripForm from "../TripForm";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();


describe('<TripForm />', () => {
    const props = {
        trip: {
            startDate: "2011-09-15",
            endDate: "2011-09-17"
        },
        fieldErrors: {},
        nonFieldErrors: []
    };

    test('renders correctly', () => {
        const result = renderer.render(<TripForm {...props} />);
        expect(result).toMatchSnapshot();
    });
});