import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import NewUser from './components/NewUser';
import Home from './components/Home';
import Profile from './components/Profile';
import AddEvent from './components/AddEvent';
import EditEvent from './components/EditEvent';
import Calendar from './components/calendar.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/newuser' component={NewUser} />
        <Route path='/home' component={Calendar} />
        {/* ^^^ Maybe change this routename to make it less confusing with Home component */}
        <Route path='/profile' component={Profile} />
        <Route path='/addevent' component={AddEvent} />
        <Route path='/editevent' component={EditEvent} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
