import React from "react";
import "./App.css";
import Customers from "./components/Customers";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Panel from "./components/Panel";
import Training from "./components/Training";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Panel />
        <Switch>
          <Route exact path="/Customers" component={Customers} />
          <Route exact path="/Trainings" component={Training} />
          <Route exact path="/Calendar" component={() => <div>nnn</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
