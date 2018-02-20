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
      zip: 10001, 
      events: [],
      dataLoaded: false,
      book: 'pinnochio'
    };

    console.log(this.state)

    this.queryYelp = this.queryYelp.bind(this);
    this.queryUser = this.queryUser.bind(this);
    this.queryEvents = this.queryEvents.bind(this);
    this.toggleData = this.toggleData.bind(this);
  }

  toggleData() {
    this.setState(prevState =>{
      prevState.dataLoaded = !prevState.dataLoaded;
      return prevState;
    })
  }

  componentDidMount() {
    this.queryYelp(this.state);
    this.queryUser();
    this.queryEvents();
    console.log('in componentDidMount, this.state is ', this.state);
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

  queryBooks(data) {
    console.log('data: ', data);
    axios({
    url: "http://localhost:8080/addevent",
    method: "post", 
    data: {
      book: data.book
    }
  }).then(response => {
      this.setState({ book: response.data });
      console.log('app.state: ', this.state);
    });
  }

  queryEvents() {
    axios({
    url: "http://localhost:8080/events",
    method: "get", 
  }).then(response => {
      this.setState({ events: response.data, dataLoaded: true });
      console.log('events: ', this.state.events);
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
    if (this.state.dataLoaded === true) {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/newuser" component={NewUser} />
            <Route exact path="/calendar" render={props => {
                return (
                  <Calendar
                    {...props}
                    eventsData={this.state.events}
                    queryEvents={this.queryEvents}
                  />
                );
              }}
            />
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
                    book={this.state.book}
                    queryBooks={this.queryBooks}
                  />
                );
              }}
            />

            <Route exact path="/editevent" component={EditEvent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  } return <div>LOADING...</div>
  }
}

export default App;
