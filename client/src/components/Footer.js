import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className='social-media-footer'>
        <a href='https://github.com/mayaprado/project3'> 
          <img src={'./images/github.png'} />
        </a>
        <a href='https://www.facebook.com/'><img src={'./images/facebook.png'} />
        </a>
        <a href='https://www.twitter.com/'>
          <img src={'./images/twitter.png'} />
        </a>
        <p>Copyright &#169; 2018 mess @ General Assembly</p><p>All Rights Reserved</p>
      </div>
    );
  }
}

export default Footer;
