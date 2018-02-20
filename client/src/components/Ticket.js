import React, { Component } from 'react';

export default class Ticket extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        ticketDatum: "Los Angeles"
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.resetState = this.resetState.bind(this);
    }

 resetState() {
    this.setState({
      ticketDatum: ""
    })
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({
      ticketDatum: e.target.value
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const data = {city: this.state.ticketDatum};
    console.log('state: ', this.state);
    this.props.queryTicket(data);
    this.resetState();
  }

  render() {
    if (this.props.ticketData)
    return  (
      <div>
      <h3>Search for events by city</h3>
      <form onSubmit={this.submitHandler}>
      <label>
        <input 
          type='text' 
          name='ticketDatum' 
          onChange={this.changeHandler}
          placeholder='Enter your city name' />
      </label>
      <button type='submit'>Search</button>
      </form>
        {this.props.ticketData.map(el => {
          console.log("THESE ARE THE MAPPED TICKETMASTER EVENTS", el);
          return (
            <div key={el.id}>
              <p>{el.name}</p>
              <h5>{el._embedded.venues[0].name}</h5>
              <h6>{el._embedded.venues[0].address.line1}</h6>
              <h6>{el.dates.start.localDate}</h6>
            </div>
          );
        })}
      
      </div>
      )
  }
}


// export default class AddEvent extends Component {

//   render() {
//     return (
//       <div>
//       This is the AddEvent Route
//       </div>
//       )
//   }
// }
