import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import axios from "axios";
import {App} from "../App";

const renderer = new ShallowRenderer();

jest.unmock('axios');
describe('<App />', () => {

    describe('when authenticated', () => {
        const props = {
            auth: {
                successful: true,
                user: {
                    jwt: "1324235234"
                }
            }
        };

        test('renders correctly', () => {
            const result = renderer.render(<App {...props} />);
            expect(result).toMatchSnapshot();
        });
    });

     describe('when not authenticated', () => {
        const props = {
            auth: {
                successful: false,
            },
        };

        test('renders correctly', () => {
            const result = renderer.render(<App {...props} />);
            expect(result).toMatchSnapshot();
        });
    });

});