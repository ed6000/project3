import React, { Component } from 'react';

export default class AddEvent extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        yelpDatum: 10001,
        showRestaurant: false,
        showBooks: false,
        showTickets: false,
        title: "",
        start: this.props.slot.start,
        end_time: this.props.slot.end,
        keyword: "",
        book: this.props.book,
        ticketDatum: "Los Angeles"
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.submitYelp = this.submitYelp.bind(this);
      this.submitBook = this.submitBook.bind(this);
      this.submitTicket = this.submitTicket.bind(this);
      this.resetState = this.resetState.bind(this);
      this.showRestaurant = this.showRestaurant.bind(this);
      this.addEvent = this.addEvent.bind(this);
      this.showBooks = this.showBooks.bind(this);
      this.showTickets = this.showTickets.bind(this);
    }

 resetState() {
    this.setState({
      yelpDatum: "",
      bookData: "",
      ticketDatum: "Los Angeles"
    })
  }

  addEvent(e) {
    e.preventDefault();
    const data = {
      title: this.state.title,
      start: String(this.state.start),
      end_time: String(this.state.end_time),
    }
    this.props.addEvent(data);
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
    e.preventDefault;
    this.setState(prevState => {
      prevState.showRestaurant = !prevState.showRestaurant;
      return prevState;
    })
  }

  showBooks(e) {
    e.preventDefault;
    this.setState(prevState => {
      prevState.showBooks = !prevState.showBooks;
      return prevState;
    })
  }

  showTickets(e) {
    e.preventDefault;
    this.setState(prevState => {
      prevState.showTickets = !prevState.showTickets;
      return prevState;
    })
  }

  render() {

    if (this.state.showRestaurant === true) {
      return  (
        <div>
        <h1>Add an Event!</h1>
        <form onSubmit={this.addEvent}>
        <label>Event
          <input 
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
            value={this.props.slot.start} />
        </label><br />
        <label>To
          <input 
            type='text' 
            name='end_time' 
            onChange={this.changeHandler}
            value={this.props.slot.end} />
        </label><br />
        <button type='submit'>Add Event</button>
        </form>
        <input type='button' onClick={this.showRestaurant} value='Search for restaurants by zip code' />
        <input type='button' onClick={this.showBooks} value='Search for books' />
        <input type='button' onClick={this.showTickets} value='Search for tickets' />
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
              <div key={el.id}>
                <p>Name: {el.name}</p>
                <p>Address: {el.location.address1}</p>
                <p>Phone: {el.display_phone}</p>
              </div>
            );
          })}
        </div>
      )
    } else if (this.state.showBooks === true) {
      return (
        <div>
        <h1>Add an Event!</h1>
        <form onSubmit={this.addEvent}>
        <label>Event
          <input 
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
            value={this.props.slot.start} />
        </label><br />
        <label>To
          <input 
            type='text' 
            name='end_time' 
            onChange={this.changeHandler}
            value={this.props.slot.end} />
        </label><br />
        <button type='submit'>Add Event</button>
        </form>
        <input type='button' onClick={this.showRestaurant} value='Search for restaurants by zip code' />
        <input type='button' onClick={this.showBooks} value='Search for books' />
        <input type='button' onClick={this.showTickets} value='Search for tickets' />
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
              <div key={index}>
                <p>Book Title: {el.volumeInfo.title}</p>
                <p>Author: {el.volumeInfo.authors}</p>
               </div>
            );
          })}</div>
        </div>
      )
    } else if (this.state.showTickets === true) {
      return (
        <div>
        <h1>Add an Event!</h1>
        <form onSubmit={this.addEvent}>
        <label>Event
          <input 
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
            value={this.props.slot.start} />
        </label><br />
        <label>To
          <input 
            type='text' 
            name='end_time' 
            onChange={this.changeHandler}
            value={this.props.slot.end} />
        </label><br />
        <button type='submit'>Add Event</button>
        </form>
          <input type='button' onClick={this.showRestaurant} value='Search for restaurants by zip code' />
          <input type='button' onClick={this.showBooks} value='Search for books' />
          <input type='button' onClick={this.showTickets} value='Search for tickets' />
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
            <div key={el.id}>
              <p>{el.name}</p>
              <h5>{el._embedded.venues[0].name}</h5>
              <h6>{el._embedded.venues[0].address.line1}</h6>
              <h6>{el.dates.start.localDate}</h6>
            </div>
          );
        })}</div>
        </div>
      )
    }return (
        <div>
        <h1>Add an Event!</h1>
        <form onSubmit={this.addEvent}>
        <label>Event
          <input 
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
            value={this.props.slot.start} />
        </label><br />
        <label>To
          <input 
            type='text' 
            name='end_time' 
            onChange={this.changeHandler}
            value={this.props.slot.end} />
        </label><br />
        <button type='submit'>Add Event</button>
        </form>
        <input type='button' onClick={this.showRestaurant} value='Search for restaurants by zip code' />
        <input type='button' onClick={this.showBooks} value='Search for books' />
        <input type='button' onClick={this.showTickets} value='Search for tickets' />
        </div>
        )
  }
}