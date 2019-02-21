import React, { Component } from "react";
import { Router } from "react-router-dom";

import routes from "./routes";
import { history } from "./store";

class App extends Component {
  render() {
    return <Router history={history}>{routes}</Router>;
  }
}

export default App;
