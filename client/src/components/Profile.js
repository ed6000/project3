import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import EditProfile from "./EditProfile";

import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    
    this.editProfile = this.editProfile.bind(this);
  }

  
  editProfile(e) {
    e.preventDefault();
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
    });
  }

  render() {
    let checkProfileEdit = null;
    if (this.state.editing) {
      checkProfileEdit = (
        <EditProfile
          queryUser={this.props.queryUser}
          usersData={this.props.usersData}
        />
      );
    }

    return (
      <div>
      <div>
        <p><img height={100} width={100} src={this.props.usersData.profile_avatar}/></p>
        <h1>Welcome to your profile page {this.props.usersData.username}</h1>
        <p>{this.props.usersData.hobbies}</p>


       
        {checkProfileEdit} 
      </div>
      <br/>
      <br/>
      <button className="edit" onClick={this.editProfile}>
          Edit Profile
        </button>
      </div>
    );
  }
}

export default Profile;