import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

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
        <header>
          <h1>Welcome to PlanIT</h1>
        </header>
        <h3>Login here:</h3>

<header><div><h1>Welcome to PlanIT</h1><br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660.42 410.12"><defs><style>.cls-1{fill:#f7c01e;}.cls-2{fill:#ce1b00;stroke:#fff;stroke-miterlimit:10;opacity:0.57;}.cls-3{font-size:204.72px;font-family:'Antic Didone';}</style></defs><title>logo</title><g id="Planet"><circle class="cls-1" cx="327.81" cy="205.06" r="205.06"/></g><g id="Ring"><path class="cls-2" d="M928,471.18c-32.78-13.39-72.08-20.13-114.08-21.07,10.79,6.79,39.42,27.1,62.78,64,61.74,42.62,37.79,121.23-73.42,176.88-120.15,60.13-261.57,53.14-307-4.36-19.45-24.62-17.41-54.64.86-83.88h0s5.27-36.69,20.25-70.09C434.6,588.05,394.16,662.32,431,719.88c55.16,86.18,256.08,104.46,432.85,16S1053.19,522.31,928,471.18Z" transform="translate(-374.38 -417.05)"/></g><g id="Layer_4" data-name="Layer 4"><text class="cls-3" transform="translate(0 261.17)">PLANIT</text></g></svg>
</div></header>
<div id="login">
  <h2 id="h2login">Login:</h2>
  <form onSubmit={this.handleSubmit}>
    <label>
    <input type="text" value={this.state.username} name="login" placeholder="Login" onChange={this.handleChange}/><br>
    <input type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.handleChange}/><br>
    <input type="submit" value="Login"/>
    </label>
   </form>
      </div>
    )
  }
}
