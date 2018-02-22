import React, { Component } from "react";

class Logo extends Component {
  render() {
    return (
      <img src={'https://i.imgur.com/YkK3ysD.png'}/>
      <img className='logo' src={require(`../images/logo.svg`)}/>
    )
  }

}

export default Logo;