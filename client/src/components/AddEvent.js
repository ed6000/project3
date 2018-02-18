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
        {this.props.yelpData.map(el => {
          console.log("THESE ARE THE MAPPED YELP RESTAURANTS", el);
          return (
            <div key={el.id}>
              <p>Name:{el.name}</p>
              <p>Address:{el.display_address}</p>
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