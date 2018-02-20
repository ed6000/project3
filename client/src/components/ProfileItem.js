import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import EditProfile from "./EditProfile";
import axios from "axios";

class ProfileItem extends Component {
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
    const profileDatum = this.props.profileDatum;
    console.log("this is profile dataum", profileDatum);

    let checkProfileEdit = null;
    if (this.state.editing) {
      checkProfileEdit = (
        <EditProfile
          profileDatum={profileDatum}
          queryUser={this.props.queryUser}
        />
      );
    }

    return (
      <div key={this.props.profileDatum.id.toString()}>
        <p>{this.props.profileDatum.profile_avatar}</p>
        <p>{this.props.profileDatum.username}</p>
        <p>{this.props.profileDatum.hobbies}</p>

        <button className="edit" onClick={this.editProfile}>
          Edit Profile
        </button>
        {checkProfileEdit}
      </div>
    );
  }
}

export default ProfileItem;
