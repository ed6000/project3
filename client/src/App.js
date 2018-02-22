import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import NewUser from "./components/NewUser";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import Calendar from "./components/calendar.js";
import TokenService from './services/TokenService';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpData: [],
      ticketData: [],
      zip: 10001,
      city: "Los Angeles",
      events: [],
      dataLoaded: false,
      book: [],
      slot: {},
      event: {},
      user: {},
      userData: {},
      background: '', 
    };

    console.log(this.state);

    this.queryYelp = this.queryYelp.bind(this);
    this.queryEvents = this.queryEvents.bind(this);
    this.toggleData = this.toggleData.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.queryBooks = this.queryBooks.bind(this);
    this.queryTicket = this.queryTicket.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.queryUser = this.queryUser.bind(this);
    this.changeBackground = this.changeBackground.bind(this);
  }

  register(data) {
    axios('/users/', {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token)
    })
    .catch(err => console.log(`err: ${err}`));
  }

  login(data) {
    console.log('login data', data);
    axios('/users/login', {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({ user: resp.data.user})
      console.log('this.state.user is ', this.state.user)
      this.queryEvents();
      this.queryUser(resp.data.user.id);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  queryUser(id) {
    console.log('in queryUser, this.state.user.id is ', this.state.user.id);
    axios(`/users/${id}`, {
      method: "GET"
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({ userData: resp.data})
      console.log('this.state.userData is ', this.state.userData)
    })
    .catch(err => console.log(`err: ${err}`));
  }

  logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
  }

  changeBackground(colorData) {
    console.log('changeBackground invoked, colorData', colorData);
    if (this.state.background !== colorData) {
    this.setState({ 'background': colorData, 'changed': true });
  }
    console.log('in changeBackground, color is ', this.state.background, this.state.changed);
  }

  toggleData() {
    this.setState(prevState => {
      prevState.dataLoaded = !prevState.dataLoaded;
      return prevState;
    });
  }

  componentDidMount() {
    console.log('app mounted');
    this.setState({ dataLoaded: true });
  }

  queryEvents() {
    this.setState({ dataLoaded: false });
    axios({
      url: `/events/${this.state.user.id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(response => {
      this.setState({ events: response.data, dataLoaded: true });
    });
  }

  queryYelp(data) {
    axios({
      url: "/events/addYelp",
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
    url: "/events/addBook",
    method: "post", 
    data
  }).then(response => {
      this.setState({ book: response.data });
    });
  }

  queryTicket(data) {
    axios({
      url: "/events/addTicket",
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
    data.id = this.state.user.id;
    console.log('in addEvent, data is ', data);
    axios({
      url: "/events",
      method: "post",
      data,
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
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
      url: `/events/${data.id}`,
      method: "put",
      data,
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
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
      url: `/events/${data.id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(response => {
      this.setState(prevState => {
        prevState.events = prevState.events.concat(response.data);
        return prevState;
      });
      this.queryEvents();
    });
  }

  render() {
    if (this.state.dataLoaded === true) {
      return (
        <BrowserRouter>
          <div className={"App " + this.state.background}>
            <Switch>
              <Route exact path="/" render={props => {
                return (<Home {...props} submit={this.login} />)
                }}
                />
              <Route exact path="/newuser" render={props => {
                return (<NewUser {...props} submit={this.register} />)
              }}
                />
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
                      changeBackground={this.changeBackground.bind(this)}
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
                      usersData={this.state.userData}
                      logout={this.logout}
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
    // return <div>LOADING...</div>;
     return <div className="*"><img className='loading' src={'./images/animated_loading.png'} /></div>
  }
}

export default App;
