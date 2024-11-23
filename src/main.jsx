import React from "react";
import ReactDOM from "react-dom/client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/utility.css';
import './styles/global.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/media.css"
import { Provider } from "react-redux";
import { store } from "./store/store";
import Links from "./routers/Links";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <Links  />
    </Provider>
  </React.StrictMode>,
);
