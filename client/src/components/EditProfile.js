import React, { Component } from "react";
import axios from "axios";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    const profileDatum = this.props.profileDatum;

    this.state = {
      profile_avatar: profileDatum.profile_avatar, hobbies: profileDatum.hobbies
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    e.preventDefault();
    const updater = {};
    updater[e.target.name] = e.target.value;
    this.setState(updater);
  }

  submitHandler(e) {
    e.preventDefault();
    axios({
      url: `http://localhost:8080/users/${this.props.profileDatum.id}`,
      method: "PUT",
      data: this.state
    }).then(response => {
      console.log("PUT successful, response.data:", response.data);
      this.props.queryUser();
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>{"profile_avatar"}</label>
          <input
            type="text"
            name="profile_avatar"
            onChange={this.changeHandler}
            value={this.state.profile_avatar}
          />
          <label>{"hobbies"}</label>
          <input
            type="text"
            name="hobbies"
            onChange={this.changeHandler}
            value={this.state.hobbies}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
export default EditProfile;
