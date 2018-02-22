import React, { Component } from "react";
import EditProfile from "./EditProfile";


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
      <div className='grid-container'>
      
        <p className='profile-img'><img className='avatar' src={this.props.usersData.profile_avatar} /></p>
        <h1 className='profile-welcome-form'><div className='welcome-msg'>Welcome to your profile {this.props.usersData.username}</div>
          <button className='profile-button' onClick={this.editProfile}>
            Edit Profile
          </button>
          {checkProfileEdit}
        </h1>
        <p className='profile-hobbies'>My hobbies: <br /> {this.props.usersData.hobbies}</p> 
      </div>
    );
  }
}

export default Profile;

