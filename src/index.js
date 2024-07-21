import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/reducer";

import ReactDOM from "react-dom/client"; // Update import
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


// Create a Redux store
const store = createStore(reducer);

// Create a root element using React 18 API
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
