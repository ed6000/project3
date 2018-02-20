import React, { Component } from 'react';

export default class AddEvent extends Component {
  
  resetState() {
    this.setState({
      yelpDatum: ""
    })
  }

  constructor(props) {
    super(props); 
      this.state = {
        yelpData: props.queryYelp
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
    }

  changeHandler(e) {
    e.preventDefault();
    this.setState({
      yelpDatum: e.target.value
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const data = {yelpDatum: this.state.yelpDatum};
    this.props.queryYelp(data);
    this.resetState();
  }

  render() {
    return  (
      <div>
      <h1>AddEvent Route</h1>
      <form onSubmit={this.submitHandler}>
      <label>
        <h3>Search for restaurants by zip code</h3>
        <input 
          type='text' 
          name='yelpDatum' 
          oncChange={this.changeHandler}
          value={this.state.yelpDatum}
          placeholder='Enter your zip code' />
      </label>
      <button type='submit'>Search</button>
      
        {this.props.yelpData.map(el => {
          console.log("THESE ARE THE MAPPED YELP RESTAURANTS", el);
          return (
            <div key={el.id}>
              <p>Name: {el.name}</p>
              <p>Address: {el.location.address1}</p>
              <p>Phone: {el.display_phone}</p>
              <button type='submit'>Add to calendar</button>
            </div>
          );
        })}
      </form>
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