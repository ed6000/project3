import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import '../App.css';
import AddEvent from './AddEvent';

BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let addEv = () => {
  console.log('in addEv')
  return(
  <React.Fragment>
    <AddEvent />
  </React.Fragment>
)
}

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(slotInfo) {
    console.log('in handleSelect');
  }

  render() {
    const events = this.props.eventsData.map(event => {
      console.log(event);
      return {
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end_time)
      }
    });
    console.log('events: ', events);
    const MyCalendar = props => (
      <React.Fragment>
        <h3 className="callout">
          Click an event to see more info, or drag the mouse over the calendar to
          select a date/time range.
        </h3>
        <div className='calendar-gridcontainer'>
        <div className='calendar-container'>
        <BigCalendar
          selectable
          events={events}
          defaultView="month"
          scrollToTime={new Date(2010, 1, 1, 6)}
          defaultDate={new Date(2018, 1, 23)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={slotInfo =>
            {
            alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                `\nend: ${slotInfo.end.toLocaleString()}` +
                `\naction: ${slotInfo.action}`
            )
            addEv()
          }
          }
        />
        </div>
        </div>
      </React.Fragment>
    );
    return <div className="calendar-container">{MyCalendar()}</div>
  }
}
