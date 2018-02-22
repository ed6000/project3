import React, { Component } from "react";
import { Link } from 'react-router-dom';


class NavBar extends Component {
  render() {
    return (
      <div>
      <nav className='navbar'>
        <Link to='/calendar'>Calendar </Link>
        <Link to='/profile'>Profile </Link>
        <Link to='/'>Logout</Link>
      </nav>
      </div>
    )
  }
}

export default NavBar;