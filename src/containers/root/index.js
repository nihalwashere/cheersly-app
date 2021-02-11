import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// containers

// components
import PageNotFound from "../../components/PageNotFound";

const RootContainer = () => {
  return (
    <div>Hello</div>
    // <Router>
    // <Switch>
    // {/* <Redirect from="/" exact to="/login" /> */}
    // {/* <Route exact path="*" render={(props) => <PageNotFound {...props} />} /> */}
    // </Switch>
    // </Router>
  );
};

export default RootContainer;
