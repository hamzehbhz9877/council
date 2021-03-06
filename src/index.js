import React from 'react';
import {render} from 'react-dom';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import App from "./containers/App";
import {Intercept} from "./services/httpService";

Intercept(store);
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

