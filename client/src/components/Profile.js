import React, { Component } from "react";
import EditProfile from "./EditProfile";
import NavBar from "./NavBar";
import Footer from "./Footer";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    
    this.editProfile = this.editProfile.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log('this.props.usersData', this.props.usersData);
    const colorData = 'stars_bg';
    this.props.changeBackground(colorData);
    console.log('in componentDidMount calendar, colorData is ', colorData);
  }
    
  
  componentWillUnmount() {
    this.props.changeBackground("");
}
  editProfile() {
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
    });
  }

  logout() {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    console.log('in Profile, this.props.usersData is ', this.props.usersData);
    let checkProfileEdit = null;
    if (this.state.editing) {
      checkProfileEdit = (
        <EditProfile
          queryUser={this.props.queryUser}
          usersData={this.props.usersData}
          editProfile={this.editProfile}
        />
      );
    } return (
      <div>
      <NavBar />
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
      <input className='profile-button' type='button' value='Logout' onClick={this.logout} />
      <footer>
        <Footer />
      </footer>
      </div>
    );
  } 
}

export default Profile;

