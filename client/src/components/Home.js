import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Logo from "./Logo";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state =
    {username: '', password: ''};
    this.queryUsers = this.queryUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  queryUsers() {
    axios.get('') //make a call to users in the DB
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    }

  handleChange(event) {
    this.setState({username: event.target.username, password: event.target.password});
  }

  handleSubmit(event) {
    alert(`The username: ${this.state.username} was submitted.`);
    event.preventDefault();
  }

  render() {
    return (
      <div>
<header><h1>Welcome to PlanIT</h1><Logo /></header>
<div className="login">
  <h2 className="h2login">Login:</h2>
  <form onSubmit={this.handleSubmit}>
    <label>
    <input type="text" value={this.state.username} name="login" placeholder="Login" onChange={this.handleChange}/><br />
    <input type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.handleChange}/><br />
    <input type="submit" value="Login"/>
    </label>
   </form>
      </div>
      </div>
    )
  }
}
