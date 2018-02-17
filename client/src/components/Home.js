import React, { Component } from 'react';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.queryUsers = this.queryUsers.bind(this)
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

  render() {
    return (
      <div>
        <header>Welcome to PlanIt!</header>

        {/* sign in form here
        register link here */}

        <footer>Copyright &#169; 2018 mess  All Rights Reserved</footer>
      </div>
    )
  }
}
