import React, { Component } from 'react';

export default class AddEvent extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        yelpDatum: 10001
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.resetState = this.resetState.bind(this);
    }

 resetState() {
    this.setState({
      yelpDatum: ""
    })
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({
      yelpDatum: e.target.value
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const data = {zip: this.state.yelpDatum};
    console.log('state: ', this.state);
    this.props.queryYelp(data);
    this.resetState();
  }

  render() {
    if (this.props.yelpData)
    return  (
      <div>
      <h1>AddEvent Route</h1>
      <h3>Search for restaurants by zip code</h3>
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
          console.log("THESE ARE THE MAPPED YELP RESTAURANTS", el);
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