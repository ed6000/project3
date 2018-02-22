import React, { Component } from "react";
import axios from "axios";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    const usersData = this.props.usersData;

    this.state = {
      profile_avatar: usersData.profile_avatar, hobbies: usersData.hobbies
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
    console.log('in EditProfile, this.state is ', this.state);
  }

  submitHandler(e) {
    const data = {
      id: this.props.usersData.id,
      profile_avatar: this.state.profile_avatar,
      hobbies: this.state.hobbies,
      username: this.props.usersData.username
    }
    console.log('in EditProfile, submitHandler, this.props.usersData is ', data);
    e.preventDefault();
    axios({
      url: `/users/${this.props.usersData.id}`,
      method: "PUT",
      data
    }).then(response => {
      console.log("PUT successful, response.data:", response.data);
      this.props.queryUser(this.props.usersData.id);
    });
  }

  render() {
    return (
      <div className='edit-profile-form'>
        <form onSubmit={this.submitHandler}>
        <br />
          <label>{"Enter image address for your profile avatar here:"}</label>
          <br />
          <br />
          <input
            className='profile-input'
            type="text"
            name="profile_avatar"
            onChange={this.changeHandler}
            value={this.state.profile_avatar}
          />
          <br />
          <br />
          <label>{"Have any hobbies? Let the world know!"}</label>
          <br />
          <br />
          <textarea
            type="text"
            name="hobbies"
            onChange={this.changeHandler}
            value={this.state.hobbies}
          />
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
export default EditProfile;
