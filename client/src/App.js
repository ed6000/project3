import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import NewUser from "./components/NewUser";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import EditProfile from "./components/EditEvent";
import Ticket from "./components/Ticket";
import Calendar from "./components/calendar.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpData: [],
      ticketData: [],
      usersData: [],
      zip: 10001,
      city: "Los Angeles",
      events: [],
      dataLoaded: false,
      slot: {},
      event: {}
    };

    console.log(this.state);

    this.queryYelp = this.queryYelp.bind(this);
    this.queryUser = this.queryUser.bind(this);
    this.queryEvents = this.queryEvents.bind(this);
    this.toggleData = this.toggleData.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.queryTicket = this.queryTicket.bind(this);
  }

  toggleData() {
    this.setState(prevState => {
      prevState.dataLoaded = !prevState.dataLoaded;
      return prevState;
    });
  }

  componentDidMount() {
    this.queryYelp(this.state);
    this.queryTicket(this.state);
    this.queryUser();
    this.queryEvents();
    console.log("in componentDidMount, this.state is ", this.state);
  }

  queryYelp(data) {
    console.log("data: ", data);
    axios({
      url: "http://localhost:8080/addevent",
      method: "post",
      data: {
        zip: data.zip
      }
    }).then(response => {
      this.setState({ yelpData: response.data });
      console.log("app.state: ", this.state);
    });
  }

  queryEvents() {
    axios({
      url: "http://localhost:8080/events",
      method: "get"
    }).then(response => {
      this.setState({ events: response.data, dataLoaded: true });
      console.log("events: ", this.state.events);
    });
  }

  queryTicket(data) {
    console.log("data: ", data);
    axios({
      url: "http://localhost:8080/ticket",
      method: "post",
      data: {
        city: data.city
      }
    }).then(response => {
      this.setState({ ticketData: response.data });
      console.log("app.state: ", this.state);
    });
  }

  selectSlot(slotInfo) {
    this.setState({ slot: slotInfo });
    console.log("in selectSlot, slot is ", this.state.slot);
  }

  addEvent(data) {
    this.setState({ dataLoaded: false });
    console.log("in app.addEvent, data is ", data);
    axios({
      url: "http://localhost:8080/events",
      method: "post",
      data
    }).then(response => {
      this.setState(prevState => {
        console.log("response is ", response.data);
        prevState.events = prevState.events.concat(response.data);
        return prevState;
      });
      console.log("in addEvent, events: ", this.state.events);
    });
  }

  selectEvent(event) {
    this.setState({ event: event });
    console.log("in selectEvent, event ", event);
  }

  editEvent(data) {
    this.setState({ dataLoaded: false });
    console.log("in app.editEvent, data is ", data);
    axios({
      url: `http://localhost:8080/events/${data.id}`,
      method: "put",
      data
    }).then(response => {
      this.setState(prevState => {
        console.log("response is ", response.data);
        prevState.events = prevState.events.concat(response.data);
        return prevState;
      });
      console.log("in editEvent, events: ", this.state.events);
    });
  }

  deleteEvent(data) {
    this.setState({ dataLoaded: false });
    console.log("in app.deleteEvent, data is ", data);
    axios({
      url: `http://localhost:8080/events/${data.id}`,
      method: "delete"
    }).then(response => {
      this.setState(prevState => {
        console.log("response is ", response.data);
        prevState.events = prevState.events.concat(response.data);
        return prevState;
      });
      console.log("in addEvent, events: ", this.state.events);
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
              <Route
                exact
                path="/calendar"
                render={props => {
                  return (
                    <Calendar
                      {...props}
                      eventsData={this.state.events}
                      queryEvents={this.queryEvents}
                      selectSlot={this.selectSlot}
                      selectEvent={this.selectEvent}
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
                      slot={this.state.slot}
                      addEvent={this.addEvent}
                      queryEvents={this.queryEvents}
                    />
                  );
                }}
              />

              <Route
                exact
                path="/ticket"
                render={props => {
                  return (
                    <Ticket
                      {...props}
                      ticketData={this.state.ticketData}
                      queryTicket={this.queryTicket}
                    />
                  );
                }}
              />

              <Route
                exact
                path="/editevent"
                render={props => {
                  return (
                    <EditEvent
                      {...props}
                      yelpData={this.state.yelpData}
                      queryYelp={this.queryYelp}
                      event={this.state.event}
                      editEvent={this.editEvent}
                      deleteEvent={this.deleteEvent}
                      queryEvents={this.queryEvents}
                    />
                  );
                }}
              />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
    return <div>LOADING...</div>;
  }
}

export default App;
