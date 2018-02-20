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
          <h1>Welcome to PlanIt!</h1>
        </header>
        <h3>Login here:</h3>

        <form onSubmit={this.handleSubmit}>
          <label>
            Username: <input type='text' value={this.state.username} placeholder='Enter username' onChange={this.handleChange} /> <br></br>
            Password: <input type='text' value={this.state.password} placeholder='Enter password' onChange={this.handleChange} /><br></br>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <h4>Don't have an account? <Link to='/newuser'> Register here! </Link> </h4>

        <section className='homepage-text'>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        <footer>
          <p>Copyright &#169; 2018 mess @ General Assembly</p><p>All Rights Reserved</p>
        </footer>
      </div>
    )
  }
}
