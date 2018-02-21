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
      ticketData: [],
      usersData: [],
      zip: 10001,
      city: "Los Angeles",
      events: [],
      dataLoaded: false,
      book: [],
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
    this.queryBooks = this.queryBooks.bind(this);
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
    const sample = { keyword: 'magic'};
    this.queryBooks(sample);
  }

  queryEvents() {
    this.setState({ dataLoaded: false });
    axios({
      url: "http://localhost:8080/events",
      method: "get"
    }).then(response => {
      this.setState({ events: response.data, dataLoaded: true });
    });
  }

  queryYelp(data) {
    axios({
      url: "http://localhost:8080/events/addYelp",
      method: "post",
      data: {
        zip: data.zip
      }
    }).then(response => {
      this.setState({ yelpData: response.data });
    });
  }

  queryBooks(data) {
    axios({
    url: "http://localhost:8080/events/addBook",
    method: "post", 
    data
  }).then(response => {
      this.setState({ book: response.data });
    });
  }

  queryTicket(data) {
    axios({
      url: "http://localhost:8080/events/addTicket",
      method: "post",
      data: {
        city: data.city
      }
    }).then(response => {
      this.setState({ ticketData: response.data });
    });
  }

  selectSlot(slotInfo) {
    this.setState({ slot: slotInfo });
  }

  addEvent(data) {
    this.setState({ dataLoaded: false });
    axios({
      url: "http://localhost:8080/events",
      method: "post",
      data
    }).then(response => {
      this.setState(prevState => {
        prevState.events = prevState.events.concat(response.data);
        return prevState;
      });
      this.queryEvents();
    });
  }

  selectEvent(event) {
    this.setState({ event: event });
  }

  editEvent(data) {
    this.setState({ dataLoaded: false });
    axios({
      url: `http://localhost:8080/events/${data.id}`,
      method: "put",
      data
    }).then(response => {
      this.setState(prevState => {
        prevState.events = prevState.events.concat(response.data);
        return prevState;
      });
      this.queryEvents();
    });
  }

  deleteEvent(data) {
    this.setState({ dataLoaded: false });
    axios({
      url: `http://localhost:8080/events/${data.id}`,
      method: "delete"
    }).then(response => {
      this.setState(prevState => {
        prevState.events = prevState.events.concat(response.data);
        return prevState;
      });
      this.queryEvents();
    });
  }

  queryUser() {
    axios({
      url: "http://localhost:8080/users/1",
      method: "get"
    }).then(response => {
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
                      dataLoaded={this.state.dataLoaded}
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
                      queryBooks={this.queryBooks}
                      book={this.state.book}
                      queryTicket={this.queryTicket}
                      ticketData={this.state.ticketData}

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
