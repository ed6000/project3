import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import NewUser from "./components/NewUser";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import EditProfile from "./components/EditEvent";
import Calendar from "./components/calendar.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpData: [],
      usersData: [],
      zip: 10001
    };

    console.log(this.state)

    this.queryYelp = this.queryYelp.bind(this);
    this.queryUser = this.queryUser.bind(this)
  }

  componentDidMount() {
    console.log('in componentDidMount, this.state is ', this.state);
    this.queryYelp(this.state);
    this.queryUser();
  }

  queryYelp(data) {
    console.log('data: ', data);
    axios({
    url: "http://localhost:8080/addevent",
    method: "post", 
    data: {
      zip: data.zip
    }
  }).then(response => {
      this.setState({ yelpData: response.data });
      console.log('app.state: ', this.state);
    });
  }

  queryUser() {
    axios({
      url: "http://localhost:8080/users/1",
      method: "get"
    }).then(response => {
      console.log(
        "In App.queryUsers, received response from server. response.data:",
        response.data
      );
      this.setState({ usersData: response.data });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/newuser" component={NewUser} />
            <Route exact path="/calendar" component={Calendar} />
            <Route
              exact
              path="/profile"
              render={props => {
                return (
                  <Profile
                    {...props}
                    usersData={this.state.usersData}
                    queryUser={this.queryUser}
                  />
                );
              }}
            />

            <Route
              exact
              path="/addevent"
              render={props => {
                return (
                  <AddEvent
                    {...props}
                    yelpData={this.state.yelpData}
                    queryYelp={this.queryYelp}
                  />
                );
              }}
            />

            <Route exact path="/editevent" component={EditEvent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
