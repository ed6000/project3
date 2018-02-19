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
        <input type='text' name='yelp' value='' />
        <button type='submit'>Search for Restaurants</button>
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

    //   constructor() {
    //     super();
    //     this.state = {
    //       fname: '',
    //       lname: '',
    //       email: '',
    //     };
      

    //   onChange = (e) => {
    //     // Because we named the inputs to match their corresponding values in state, it's
    //     // super easy to update the state
    //     const state = this.state
    //     state[e.target.name] = e.target.value;
    //     this.setState(state);
    //   }

    //   onSubmit = (e) => {
    //     e.preventDefault();
    //     // get our form data out of state
    //     const { fname, lname, email } = this.state;

    //     axios.post('/', { fname, lname, email })
    //       .then((result) => {
    //         //access the results here....
    //         console.log(result.data);
    //       });
    //   }

    //   render() {
    //     const { fname, lname, email } = this.state;
    //     return (
    //       <form onSubmit={this.onSubmit}>
    //         <input type="text" name="fname" value={fname} onChange={this.onChange} />
    //         <input type="text" name="lname" value={lname} onChange={this.onChange} />
    //         <input type="text" name="email" value={email} onChange={this.onChange} />
    //         <button type="submit">Submit</button>
    //       </form>
    //     );
    //   }
    // }






// export default class AddEvent extends Component {

//   render() {
//     return (
//       <div>
//       This is the AddEvent Route
//       </div>
//       )
//   }
// }