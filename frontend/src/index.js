import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import App from "App/Containers/App";
import registerServiceWorker from './registerServiceWorker';
import {persistor, store} from "./store";
import {Helmet} from "react-helmet";


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();