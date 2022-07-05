import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TutorialsList from "./components/tutorials-list.component";
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            BBBB
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Router>
          <Switch>
            <Route   path="/add" component={AddTutorial} />
            <Route   path="/tutorials/:id" component={Tutorial} />
          <Route  exact path={["/", "/tutorials"]} component={TutorialsList} />
          </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
export default App;