import React, { Component } from 'react';

export default class AddEvent extends Component {

constructor(props) {
    super(props);
    this.state = {
      books: props.queryBooks
    }
  }

  render() {
    return  (
      <div>
        {this.props.cheeses.map(el => {
          console.log("THESE ARE THE MAPPED BOOKS", el);
          return (
            <div key={el.id}>
              <p>Books:{el.name}</p>
            </div>
          );
        })}
      </div>
      )
  }
}