import React, { Component } from 'react';

export default class EditEvent extends Component {
constructor(props) {
    super(props); 
      this.state = {
        // yelpData: props.queryYelp,
        Books: props.queryBooks
      }
    }
  render() {
    return (
      <div>
<h1>AddEvent Route</h1>
        {this.props.Books.map(el => {
          console.log("THESE ARE THE MAPPED BOOKS", el);
          return (
            <div key={el.id}>
              <p>Name:{el.best_book.title}</p>
            </div>
          );
        })}
      </div>
      )
  }
}