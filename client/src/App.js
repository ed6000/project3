import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import NewUser from './components/NewUser';
import Home from './components/Home';
import Profile from './components/Profile';
import AddEvent from './components/AddEvent';
import EditEvent from './components/EditEvent'; 
import Calendar from './components/calendar.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Assuming we want to store the Books data as an array:
    this.state = { Books: [] };

    this.queryBooks = this.queryBooks.bind(this);
    this.editCheese = this.editBook.bind(this);
  }

  queryBooks() {
    axios({
      url: "ttps://www.goodreads.com/search.xml?key=u7a25KasrUoQv8PVatUMg&q={searchTerm}",
      method: "get"
    }).then(response => {
      console.log(
        "In App.queryBooks, received response from server. response.data:",
        response.data
      );
      this.setState({ Books: response.data });
    });
  }
  componentDidMount() {
    this.queryBooks();
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/newuser' component={NewUser} />
        <Route path='/home' component={Calendar} />
        <Route path='/profile' component={Profile} />
        <Route path='/addevent' component={AddEvent} />
        <Route path='/editevent' component={EditEvent} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
