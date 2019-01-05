import React from "react";

import LocationForm from "../../Components/LocationForm";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();



describe('<LocationForm />', () => {
    const props = {
        location: {
            city: {
                name_std: "Bristol",
                country: "United Kingdom"
            },
            startDate: "2011-09-20",
            endDate: "2011-09-21"
        },
        errors: {}
    };

    test('renders correctly', () => {
        const result = renderer.render(<LocationForm {...props} />);
        expect(result).toMatchSnapshot();
    });
});