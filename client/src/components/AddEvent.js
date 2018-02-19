import React, { Component } from 'react';

export default class AddEvent extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        yelpData: props.queryYelp
      }
    }

constructor(props) {
    super(props);
    this.state = {
      books: props.queryBooks
    }
  }

  render() {
    return  (
      <div>
<<<<<<< HEAD
        {this.props.cheeses.map(el => {
          console.log("THESE ARE THE MAPPED BOOKS", el);
          return (
            <div key={el.id}>
              <p>Books:{el.name}</p>
=======
      <h1>AddEvent Route</h1>
        {this.props.yelpData.map(el => {
          console.log("THESE ARE THE MAPPED YELP RESTAURANTS", el);
          return (
            <div key={el.id}>
              <p>Name:{el.name}</p>
              <p>Address:{el.display_address}</p>
>>>>>>> 2023e92e63ba5a6a91c2abafe565864b608e037f
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