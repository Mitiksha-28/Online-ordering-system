import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "./index.css";

import store from "./store/index.ts";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
