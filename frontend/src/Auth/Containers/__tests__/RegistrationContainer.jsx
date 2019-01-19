import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import RegistrationContainer from "../RegistrationContainer";

const renderer = new ShallowRenderer();

describe('<RegistrationContainer />', () => {
    const props = {
        errors: null
    };

    test('renders correctly', () => {
        const result = renderer.render(<RegistrationContainer {...props} />);
        expect(result).toMatchSnapshot();
    });
});