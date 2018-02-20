import React, { Component } from 'react';

export default class AddEvent extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        yelpData: props.queryYelp
      }
    }

  render() {
    return  (
      <div>
      <h1>AddEvent Route</h1>
      <form>
      <label>
        <h3>Search for restaurants by zip code</h3>
        <input type='text' name='yelp' />
      </label>
        <button type='submit'>Search by zip code</button>
      </form>
        {this.props.yelpData.map(el => {
          console.log("THESE ARE THE MAPPED YELP RESTAURANTS", el);
          return (
            <div key={el.id}>
              <p>Name: {el.name}</p>
              <p>Address: {el.location.address1}</p>
              <p>Phone: {el.display_phone}</p>
              <button>Add to calendar</button>
            </div>
          );
        })}
      </div>
      )
  }
}