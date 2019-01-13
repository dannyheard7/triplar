import React from "react";

import TripForm from "../../Components/TripForm";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();


describe('<TripForm />', () => {
    const props = {
        trip: {
            arrivalDate: "2011-09-15",
            departureDate: "2011-09-17"
        },
        fieldErrors: {},
        nonFieldErrors: []
    };

    test('renders correctly', () => {
        const result = renderer.render(<TripForm {...props} />);
        expect(result).toMatchSnapshot();
    });
});