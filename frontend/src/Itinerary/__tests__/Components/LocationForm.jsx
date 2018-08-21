import React from "react";

import DestinationForm from "Itinerary/Components/LocationForm";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();



describe('<DestinationForm />', () => {
    const props = {
        location: {
            city: {
                name_std: "Bristol",
                country: "United Kingdom"
            },
        },
        errors: {}
    };

    test('renders correctly', () => {
        const result = renderer.render(<DestinationForm {...props} />);
        expect(result).toMatchSnapshot();
    });
});