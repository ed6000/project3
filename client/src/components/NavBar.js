import React, { Component } from "react";
import { Link } from 'react-router-dom';


class NavBar extends Component {
  render() {
    return (
      <div className='navbar'>
      <nav>
        <Link to='/calendar'>Home </Link>
        <Link to='/profile'>Profile </Link>
        <Link to='/addevent'>Add Event </Link>
        <Link to='/'>Logout</Link>
      </nav>
      </div>
    )
  }
}

export default NavBar;