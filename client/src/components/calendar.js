import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import '../App.css';

BigCalendar.momentLocalizer(moment);

const myEventsList = [{event: "movie"}, {event: "book"}];

const MyCalendar = props => (
  <div className="calendar-container">
    <BigCalendar
      events={myEventsList}
      startAccessor='startDate'
      endAccessor='endDate'
    />
  </div>
);

export default class Calendar extends Component {
  render() {
    return <div className="calendar-container">{MyCalendar()}</div>
  }
}