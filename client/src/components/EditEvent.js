import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default class EditEvent extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        yelpDatum: 10001,
        showRestaurant: false,
        showBooks: false,
        showTickets: false,
        book: this.props.book,
        ticketDatum: "Los Angeles",
        start: this.props.event.start,
        end_time: this.props.event.end,
        title: this.props.event.title,
        id: this.props.event.id,
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.resetState = this.resetState.bind(this);
      this.showRestaurant = this.showRestaurant.bind(this);
      this.editEvent = this.editEvent.bind(this);
      this.delete = this.delete.bind(this);
      this.submitYelp = this.submitYelp.bind(this);
      this.submitBook = this.submitBook.bind(this);
      this.submitTicket = this.submitTicket.bind(this);
      this.showBooks = this.showBooks.bind(this);
      this.showTickets = this.showTickets.bind(this);
      this.grabRestaurantinfo = this.grabRestaurantinfo.bind(this);
      this.grabBookinfo = this.grabBookinfo.bind(this);
      this.grabActivityinfo = this.grabActivityinfo.bind(this);
    }

 resetState() {
    this.setState({
      yelpDatum: ""
    })
  }

  delete(e) {
    e.preventDefault();
    const data = {id: this.state.id};
    console.log('in editEvent.deleteEvent, data is ', data);
    this.props.deleteEvent(data);
    this.props.queryEvents();
    this.props.history.push('/calendar');
  }

  editEvent(e) {
    e.preventDefault();
    const data = {
      id: this.state.id,
      title: this.state.title,
      start: String(this.state.start),
      end_time: String(this.state.end_time),
    }
    console.log('in editEvent.editEvent, data is ', data);
    this.props.editEvent(data);
    this.props.queryEvents();
    this.props.history.push('/calendar');
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitYelp(e) {
    e.preventDefault();
    const data = {zip: this.state.yelpDatum};
    this.props.queryYelp(data);
    this.resetState();
  }

  submitBook(e) {
    e.preventDefault();
    const bookData = {keyword: this.state.keyword};
    this.props.queryBooks(bookData);
    this.resetState();
  }

  submitTicket(e) {
    e.preventDefault();
    const ticketData = {city: this.state.ticketDatum};
    this.props.queryTicket(ticketData);
    this.resetState();
  }

  showRestaurant(e) {
    e.preventDefault();
    this.setState(prevState => {
      prevState.showRestaurant = !prevState.showRestaurant;
      return prevState;
    })
  }

  showRestaurant(e) {
    e.preventDefault();
    this.setState(prevState => {
      prevState.showRestaurant = !prevState.showRestaurant;
      return prevState;
    })
  }

  showBooks(e) {
    e.preventDefault();
    this.setState(prevState => {
      prevState.showBooks = !prevState.showBooks;
      return prevState;
    })
  }

  showTickets(e) {
    e.preventDefault();
    this.setState(prevState => {
      prevState.showTickets = !prevState.showTickets;
      return prevState;
    })
  }

  grabRestaurantinfo(e) {
    e.preventDefault;

    const inputLocation = document.getElementById("yelpinput");
    const divLocation = document.getElementById("yelpinfo");
    const nameLocation = e.target.getAttribute("data-name");
    const addressLocation = e.target.getAttribute("data-address");
    const phoneLocation = e.target.getAttribute("data-phone");
    inputLocation.value =
      nameLocation + "\n" + addressLocation + "\n" + phoneLocation;
    if (inputLocation != "") {
      this.setState({
        [inputLocation.name]: inputLocation.value
      });
    }
  }

  grabBookinfo(e) {
    e.preventDefault;

    const inputLocation = document.getElementById("bookinput");
    const divLocation = document.getElementById("bookinfo");
    const titleLocation = e.target.getAttribute("data-title");
    const authorLocation = e.target.getAttribute("data-author");
    inputLocation.value = titleLocation + "\n" + authorLocation;
    if (inputLocation != "") {
      this.setState({
        [inputLocation.name]: inputLocation.value
      });
    }
  }

  grabActivityinfo(e) {
    e.preventDefault;

    const inputLocation = document.getElementById("activityinput");
    const fromLocation = document.getElementById("ticketFrom");
    const toLocation = document.getElementById("ticketTo");
    const divLocation = document.getElementById("ticketinfo");
    const titleLocation = e.target.getAttribute("data-title");
    const nameLocation = e.target.getAttribute("data-name");
    const addressLocation = e.target.getAttribute("data-address");
    const dateLocation = e.target.getAttribute("data-date");
    const startDateLocation = e.target.getAttribute("data-startdate");
    const startTimeLocation = e.target.getAttribute("data-starttime");
    const endDateTimeLocation = e.target.getAttribute("data-enddatetime");

    inputLocation.value =
      titleLocation +
      "\n" +
      nameLocation +
      "\n" +
      addressLocation +
      "\n" +
      startDateLocation;

    fromLocation.value = startDateLocation + " " + startTimeLocation;

    toLocation.value = endDateTimeLocation;

    if (inputLocation != "" || toLocation != "" || fromLocation != "") {
      this.setState({
        [inputLocation.name]: inputLocation.value,
        [fromLocation.name]: fromLocation.value,
        [toLocation.name]: toLocation.value
      });
    }
  }

  render() {

    if (this.state.showRestaurant === true) {
      return  (
        <div>
         <NavBar />
        <h1>Edit an Event!</h1>
        <form onSubmit={this.editEvent}>
        <label>Event
          <textarea
            id="yelpinput"
            className="eventinfo" 
            type='text' 
            name='title' 
            onChange={this.changeHandler}
            placeholder='Enter your event' />
        </label><br />
        <label>From
          <input 
            type='text' 
            name='start' 
            onChange={this.changeHandler}
            value={this.props.event.start} />
        </label><br />
        <label>To
          <input 
            type='text' 
            name='end_time' 
            onChange={this.changeHandler}
            value={this.props.event.end} />
        </label><br />
        <button type='submit'>Edit Event</button>
        <input type='button' onClick={this.delete} value='Delete event' />
        </form>
        <br />
        <input type='button' onClick={this.showRestaurant} value='Search for restaurants' />
        <input type='button' onClick={this.showBooks} value='Search for books' />
        <input type='button' onClick={this.showTickets} value='Search for activities' />
        <form onSubmit={this.submitYelp}>
        <label>
          <input 
            type='text' 
            name='yelpDatum' 
            onChange={this.changeHandler}
            placeholder='Enter your zip code' />
        </label>
        <button type='submit'>Search</button>
        </form>
          {this.props.yelpData.map(el => {
            return (
              <div data-solo={el.id} id="yelpinfo" key={el.id}>
                <p>Name: {el.name}</p>
                <p>Address: {el.location.address1}</p>
                <p>Phone: {el.display_phone}</p>
                <button
                  data-name={el.name}
                  data-address={el.location.address1}
                  data-phone={el.display_phone}
                  id="movedata"
                  onClick={this.grabRestaurantinfo}
                >
                  Select this Restaurant
                </button>
              </div>
            );
          })}
        </div>
      )
    } else if (this.state.showBooks === true) {
      return (
        <div>
         <NavBar />
        <h1>Edit an Event!</h1>
        <form onSubmit={this.editEvent}>
        <label>Event
         <textarea 
            id="bookinput"
            className="eventinfo"
            type="text"
            name="title"
            onChange={this.changeHandler}
            placeholder="Enter your event" />
        </label><br />
        <label>From
          <input 
            type='text' 
            name='start' 
            onChange={this.changeHandler}
            value={this.props.event.start} />
        </label><br />
        <label>To
          <input 
            type='text' 
            name='end_time' 
            onChange={this.changeHandler}
            value={this.props.event.end} />
        </label><br />
        <button type='submit'>Edit Event</button>
        <input type='button' onClick={this.delete} value='Delete event' />
        </form>
        <br />
        <input type='button' onClick={this.showRestaurant} value='Search for restaurants' />
        <input type='button' onClick={this.showBooks} value='Search for books' />
        <input type='button' onClick={this.showTickets} value='Search for activities' />
        <form onSubmit={this.submitBook}>
        <label>
          <input 
            type='text' 
            name='keyword' 
            onChange={this.changeHandler}
            placeholder='Search for book' />
        </label>
        <button type='submit'>Search</button>
        </form>
          <div>{this.props.book.map((el, index) => {
            return (
              <div id="bookinfo" key={index}>
                  <p>Book Title: {el.volumeInfo.title}</p>
                  <p>Author: {el.volumeInfo.authors}</p>
                  <button
                    data-title={el.volumeInfo.title}
                    data-author={el.volumeInfo.authors}
                    id="movedata"
                    onClick={this.grabBookinfo}
                  >
                    Select this Book
                  </button>
                </div>
            );
          })}</div>
        </div>
      )
    } else if (this.state.showTickets === true) {
      return (
        <div>
         <NavBar />
        <h1>Edit an Event!</h1>
        <form onSubmit={this.editEvent}>
        <label>Event
          <textarea 
            id="activityinput"
            type="text"
            name="title"
            onChange={this.changeHandler}
            placeholder="Enter your event"/>
        </label><br />
        <label>From
          <input 
            id="ticketFrom"
                type="text"
                name="start"
                onChange={this.changeHandler}/>
        </label><br />
        <label>To
          <input 
            id="ticketTo"
                type="text"
                name="end_time"
                onChange={this.changeHandler}/>
        </label><br />
        <button type='submit'>Edit Event</button>
        <input type='button' onClick={this.delete} value='Delete event' />
        </form>
        <br />
          <input type='button' onClick={this.showRestaurant} value='Search for restaurants' />
          <input type='button' onClick={this.showBooks} value='Search for books' />
          <input type='button' onClick={this.showTickets} value='Search for activities' />
          <form onSubmit={this.submitTicket}>
        <label>
          <input 
            type='text' 
            name='ticketDatum' 
            onChange={this.changeHandler}
            placeholder='Enter your city name' />
        </label>
        <button type='submit'>Search</button>
        </form>
        <div>{this.props.ticketData.map(el => {
          return (
            <div id="ticketinfo" key={el.id}>
                  <p>{el.name}</p>
                  <h5>{el._embedded.venues[0].name}</h5>
                  <h6>{el._embedded.venues[0].address.line1}</h6>
                  <h6>{el.dates.start.localDate}</h6>
                  <button
                    data-title={el.name}
                    data-name={el._embedded.venues[0].name}
                    data-address={el._embedded.venues[0].address.line1}
                    data-startdate={el.dates.start.localDate}
                    data-starttime={el.dates.start.localTime}
                    data-enddatetime={el.dates.start.dateTime}
                    id="movedata"
                    onClick={this.grabActivityinfo}
                  >
                    Select this Activity
                  </button>
                </div>
          );
        })}</div>
        </div>
      )
    }return (
        <div>
        <NavBar />
        <h1>Edit an Event!</h1>
        <form onSubmit={this.editEvent}>
        <label>Event
          <input 
            type='text' 
            name='title' 
            onChange={this.changeHandler}
            placeholder={this.state.title} />
        </label><br />
        <label>From
          <input 
            type='text' 
            name='start' 
            onChange={this.changeHandler}
            value={this.props.event.start} />
        </label><br />
        <label>To
          <input 
            type='text' 
            name='end_time' 
            onChange={this.changeHandler}
            value={this.props.event.end} />
        </label><br />
        <button type='submit'>Edit Event</button>
        <input type='button' onClick={this.delete} value='Delete event' />
        </form>
        <input type='button' onClick={this.showRestaurant} value='Search for restaurants' />
        <input type='button' onClick={this.showBooks} value='Search for books' />
        <input type='button' onClick={this.showTickets} value='Search for activities' />
        <footer>
          <Footer />
        </footer>
        </div>
        )
  }
}
