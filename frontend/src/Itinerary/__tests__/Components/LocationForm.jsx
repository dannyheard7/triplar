import React from "react";

import LocationForm from "Itinerary/Components/LocationForm";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();



describe('<LocationForm />', () => {
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
        const result = renderer.render(<LocationForm {...props} />);
        expect(result).toMatchSnapshot();
    });
});