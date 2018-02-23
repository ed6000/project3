import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BigCalendar from 'react-big-calendar';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import '../App.css';
import NavBar from './NavBar';
import Footer from './Footer';

BigCalendar.momentLocalizer(moment);


export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: this.props.dataLoaded,
      events: this.props.eventsData
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleSelect(slotInfo) {
    this.props.selectSlot(slotInfo);
    this.props.history.push('/addevent');
  }

  handleEdit(event) {
    this.props.selectEvent(event);
    this.props.history.push('/editevent');
  }

  componentDidMount() {
    const colorData = 'stars_bg';
    this.props.changeBackground(colorData);
    console.log('in componentDidMount calendar, colorData is ', colorData);
  }
  
  render() {
    const events = this.state.events.map(event => {
      return {
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end_time)
      }
    });
    const MyCalendar = props => (
      <React.Fragment>
      <NavBar />
        <h3 className="callout">
          Click an event to see more info, or drag the mouse over the calendar to
          select a date/time range.
        </h3>
        <div className='calendar-gridcontainer'>
        <div className='calendar-container'>
        <BigCalendar className='calendar'
          selectable
          events={events}
          defaultView="month"
          scrollToTime={new Date(2010, 1, 1, 6)}
          defaultDate={new Date(2018, 1, 23)}
          onSelectEvent={event => {
            if (window.confirm("Edit event?")) {
              this.handleEdit(event);
            } else {
               console.log('editing denied');
            }}}
          onSelectSlot={slotInfo =>
            this.handleSelect(slotInfo)
          }
        />
        </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
    if (this.state.dataLoaded === true) {
      return <div className="calendar-container">{MyCalendar()}</div>
    } else {
      return <div>LOADING EVENTS...</div>
       }
  }
}
