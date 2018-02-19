import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import Events from '../events';
import '../App.css';

BigCalendar.momentLocalizer(moment);

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(slotInfo) {
    Events.push({
      title: 'create an app',
      start: slotInfo.start,
      end: slotInfo.end,
    });
    console.log('events: ', Events);
  }

  render() {
    const events = {Events};
    console.log('events: ', events);
    const MyCalendar = props => (
      <div className="calendar-container">
        <BigCalendar
          selectable={true}
          onSelectSlot={this.handleSelect}
          events={Events}
          startAccessor='startDate'
          endAccessor='endDate'
          onSelectEvent={event => alert(Event.title)}
          onSelectSlot={slotInfo => {
            alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                `\nend: ${slotInfo.end.toLocaleString()}` +
                `\naction: ${slotInfo.action}`
            )
            this.handleSelect(slotInfo);
          }
          }
        />
      </div>
    );
    return <div className="calendar-container">{MyCalendar()}</div>
  }
}