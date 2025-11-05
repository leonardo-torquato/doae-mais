import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import DonorArea from "./pages/DonorArea";
import AdminArea from "./pages/AdminArea";
import Needs from "./pages/Needs";
import CleanLayout from "./components/UI/CleanLayout";

function App() {
  return (
    <Router>
      <CleanLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/donor" component={DonorArea} />
          <Route path="/admin" component={AdminArea} />
          <Route path="/needs" component={Needs} />
        </Switch>
      </CleanLayout>
    </Router>
  );
}

export default App;
