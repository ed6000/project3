import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
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

<<<<<<< HEAD
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

=======
    this.state = {
      yelpData: []
    };
    this.queryYelp = this.queryYelp.bind(this);
  }

   queryYelp() {
    axios({
    url: "http://localhost:8080/addevent",
    method: "get"
  }).then(response => {
      console.log('In App.queryYelp, receieved response from server. response.data.businesses:', response.data
      );
      this.setState({ yelpData: response.data });
    });
  }

  componentDidMount() {
    this.queryYelp();
  }


>>>>>>> 2023e92e63ba5a6a91c2abafe565864b608e037f
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/newuser' component={NewUser} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/profile' component={Profile} />

        <Route path='/addevent' 
          render={props => { 
            return (
              <AddEvent
                {...props}
                yelpData={this.state.yelpData}
                queryYelp={this.queryYelp}
                />
              );
            }} 
          />

        <Route path='/editevent' component={EditEvent} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
