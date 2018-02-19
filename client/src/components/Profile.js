import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';


export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersData: props.queryUsers
    }
  }

  render() {
    return (
      <div>
        This is the Profile route
        {this.props.usersData.map(users => {
          console.log("THESE ARE THE MAPPED USERS", users);
          return (
            <div key={users.id}>
              <p>:{users.username}</p>
            </div>
          );
        })}
      </div>
      )
  }
}