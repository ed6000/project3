import React, { Component } from "react";

class Logo extends Component {
  render() {
    return (
      <img className='logo' src={require(`../images/logo.svg`)}/>
    )
  }

}

export default Logo;