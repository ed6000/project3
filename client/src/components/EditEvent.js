import React, { Component } from 'react';

export default class EditEvent extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        yelpDatum: 10001,
        showRestaurant: false,
        start: this.props.event.start,
        end_time: this.props.event.end,
        title: this.props.event.title,
        id: this.props.event.id,
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.resetState = this.resetState.bind(this);
      this.showRestaurant = this.showRestaurant.bind(this);
      this.editEvent = this.editEvent.bind(this);
      this.delete = this.delete.bind(this);
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

  submitHandler(e) {
    e.preventDefault();
    const data = {zip: this.state.yelpDatum};
    console.log('state: ', this.state);
    this.props.queryYelp(data);
    this.resetState();
  }

  showRestaurant(e) {
    e.preventDefault();
    this.setState(prevState => {
      prevState.showRestaurant = !prevState.showRestaurant;
      return prevState;
    })
  }

  render() {
    if (this.state.showRestaurant === true) {
      return  (
        <div>
        <h1>Edit an Event!</h1>
        <input type='button' onClick={this.showRestaurant} value='Search for restaurants' />
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
    } return (
        <div>
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
        </div>
        )
  }
}
