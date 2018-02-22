import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        <header>
          <h1>Welcome to PlanIt!</h1>
        </header>
        <h3>Login here:</h3>
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
