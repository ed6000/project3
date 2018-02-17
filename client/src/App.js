import React, { Component } from 'react';
import Calendar from './components/calendar.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>this is a calendar</h1>
        <Calendar />
      </div>
    );
  }
}

export default App;
