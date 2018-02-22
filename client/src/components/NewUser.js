import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.props.history.push('/');
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <header>
          <h1>Welcome to PlanIt!</h1>
        </header>
        <Logo />
        <h3>Register Here:</h3>
        <form onSubmit={this.handleSubmit}>
        <label>Name
          <input 
            type="text" 
            name="username" 
            onChange={this.handleChange}
            value={this.state.username} />
        </label>
        <label>Password
          <input 
            type="password" 
            name="password" 
            onChange={this.handleChange}
            value={this.state.password} />
        </label>
        <button type="submit" value="Submit">Submit</button>
      </form>
        <footer>
          <p>Copyright &#169; 2018 mess @ General Assembly</p><p>All Rights Reserved</p>
        </footer>
      </div>
      </BrowserRouter>
    )
  }
}
