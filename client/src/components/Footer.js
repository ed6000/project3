import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="social-media-footer">
        <img src={'./images/github.png'} />
        <img src={'./images/facebook.png'} />
        <img src={'./images/twitter.png'} />
        <p>Copyright &#169; 2018 mess @ General Assembly</p>
        <p>All Rights Reserved</p>
      </div>
    );
  }
}

export default Footer;
