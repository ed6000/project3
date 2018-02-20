import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import ProfileItem from "./ProfileItem";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.profileBreakdown = this.profileBreakdown.bind(this);
  }

  profileBreakdown(profileDatum) {
    return (
      <ProfileItem
        profileDatum={profileDatum}
        queryUser={this.props.queryUser}
      />
    );
  }

  render() {

    return (
      <div>
        <p>{this.props.usersData.profile_avatar}</p>
        <h1>Welcome to your profile page {this.props.usersData.username}</h1>
        <p>{this.props.usersData.hobbies}</p>
        
      </div>
    );
  }
}

export default Profile;