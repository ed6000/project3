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
        bookData: "ulysses"
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.resetState = this.resetState.bind(this);
      this.showRestaurant = this.showRestaurant.bind(this);
      this.addEvent = this.addEvent.bind(this);
      this.showBooks = this.showBooks.bind(this);
    }

 resetState() {
    this.setState({
      yelpDatum: "",
      bookData: ""
    })
  }

  addEvent(e) {
    e.preventDefault();
    const data = {
      title: this.state.title,
      start: String(this.state.start),
      end_time: String(this.state.end_time),
    }
    console.log('in addEvent.addEvent, data is ', data);
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

  submitHandler(e) {
    e.preventDefault();
    const data = {zip: this.state.yelpDatum};
    console.log('state: ', this.state);
    this.props.queryYelp(data);
    this.resetState();
    const books = {books: this.state.bookData};
    this.props.queryBooks(data);
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
        <form onSubmit={this.submitHandler}>
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
      const bookObj = this.props.book.map((el, index) => {
            console.log("THESE ARE THE MAPPED BOOKS", el);
            return (
              <div key={index}>
                <p>Book Title: {el}</p>
                <p>Author: unknown</p>
               </div>
            );
          })
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
        <form onSubmit={this.submitHandler}>
        <label>
          <input 
            type='text' 
            name='bookData' 
            onChange={this.changeHandler}
            placeholder='Search for book' />
        </label>
        <button type='submit'>Search</button>
        </form>
          <div>{bookObj}</div>
        </div>
      )
    } return (
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
        </div>
        )
  }
}