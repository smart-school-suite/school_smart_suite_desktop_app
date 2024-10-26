import React from "react";
import ReactDOM from "react-dom/client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import './styles/utility.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/customer-support.css"
import Links from "./routers/Links";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Links  />
  </React.StrictMode>,
);
