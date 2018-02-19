import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import NewUser from './components/NewUser';
import Home from './components/Home';
import Profile from './components/Profile';
import AddEvent from './components/AddEvent';
import EditEvent from './components/EditEvent';
import Calendar from './components/calendar.js'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yelpData: [],
      usersData: []
    };
    this.queryYelp = this.queryYelp.bind(this);
    this.queryUsers = this.queryUsers.bind(this);

  }

   queryYelp() {
    axios({
    url: "http://localhost:8080/addevent",
    method: "get"
  }).then(response => {
      console.log('In App.queryYelp, receieved response from server. response.data.businesses:', response.data
      );
      this.setState({ yelpData: response.data });
    });
  }

  queryUsers() {
    axios({
      url: "http://localhost:8080/users",
      method: "get"
    }).then(response => {
      console.log(
        "In App.queryUsers, received response from server. response.data:",
        response.data
      );
      this.setState({ usersData: response.data });
    });
  }

  componentDidMount() {
    this.queryYelp()
    this.queryUsers()
  }



  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/newuser' component={NewUser} />
        <Route exact path='/calendar' component={Calendar} />
        <Route exact path='/profile'
        render={props => {
          return (
            <Profile
            {...props}
            usersData={this.state.usersData}
            queryUsers={this.queryUsers}
            />
            );
        }}
        />

        <Route exact path='/addevent' 
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

        <Route exact path='/editevent' component={EditEvent} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
