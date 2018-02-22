import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from "./Logo";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
    this.props.history.push('/calendar');
  }

  render() {
    return (
      <div>
       <header><h1>Welcome to PlanIT</h1><br /><Logo /></header>
        <div className="login">
          <h2 className="h2login">Login:</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
            <input type="text" value={this.state.username} name="username" placeholder="Login" onChange={this.handleChange}/><br />
            <input type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.handleChange}/><br />
            <input type="submit" value="Login"/>
            </label>
          </form>
          <h4>Don't have an account? <Link to='/newuser'> Register here! </Link> </h4>
        </div>
      </div>
    )
  }
}
