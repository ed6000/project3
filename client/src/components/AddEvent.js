import React, { Component } from 'react';

export default class AddEvent extends Component {
//   constructor(props) {
//     super(props); 
//       this.state = {
//         yelpData: props.queryYelp
//       }
//     }

//   render() {
//     return  (
//       <div>
//       <h1>AddEvent Route</h1>
//         {this.props.yelpData.map(el => {
//           console.log("THESE ARE THE MAPPED YELP RESTAURANTS", el);
//           return (
//             <div key={el.id}>
//               <p>Name: {el.name}</p>
//               <p>Address: {el.location.address1}</p>
//               <p>Phone: {el.display_phone}</p>
//             </div>
//           );
//         })}
//       </div>
//       )
//   }
// }

  constructor() {
    super();
    this.state = {
      time: '',
      event: ''
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { time, event } = this.state;

    axios.post('/' { time, event })
      .then((result) => {

      });
  }

  render() {
    const { date, time, event } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="time" value={time} onChange={this.onChange} />
        <input type="text" name="event" value={event} onChange={this.onChange} />
        <button type="submit">Submit</button>
      </form>
    );
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