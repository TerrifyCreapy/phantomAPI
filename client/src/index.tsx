import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { setupStore } from "stores/store";

import "styles/reset.scss";
import { Provider } from "react-redux";



const store = setupStore();


const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider> 
        </BrowserRouter>
    </React.StrictMode>,
);
