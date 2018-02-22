import React, { Component } from "react";

class Logo extends Component {
  render() {
    return (
      <div>
      <img className='logo' src={require(`../images/logo.svg`)}/>
      </div>
    )
  }

}

export default Logo;