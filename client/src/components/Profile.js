import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: props.queryUser
    };
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.props.usersData.username}</h1>
      </div>
    );
  }
}
