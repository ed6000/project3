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
      yelpData: []
    };
    this.queryYelp = this.queryYelp.bind(this);
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

  componentDidMount() {
    this.queryYelp();
  }


  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/newuser' component={NewUser} />
        <Route path='/home' component={Calendar} />
        <Route path='/profile' component={Profile} />

        <Route path='/addevent' 
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

        <Route path='/editevent' component={EditEvent} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
  // <Route path='/addevent' component={AddEvent} />
}

export default App;
