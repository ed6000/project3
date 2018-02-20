import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import events from '../events';
import '../App.css';
import AddEvent from './AddEvent';

BigCalendar.momentLocalizer(moment);
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let addEv = () => {
  console.log('in addEv')
  return(
  <React.Fragment>
    <AddEvent />
  </React.Fragment>
)
}

let Selectable = () => (
  <React.Fragment>
    <h3 className="callout">
      Click an event to see more info, or drag the mouse over the calendar to
      select a date/time range.
    </h3>
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
  </React.Fragment>
)

export default Selectable

// export default class Calendar extends Component {
//   constructor(props) {
//     super(props);
//     this.handleSelect = this.handleSelect.bind(this);
//   }

//   handleSelect(slotInfo) {
//     console.log('in handleSelect');
//   }

//   render() {
//     console.log('events: ', events);
//     const MyCalendar = props => (
//       <div className="calendar-container">
//         <BigCalendar
//           selectable={true}
//           onSelectSlot={this.handleSelect}
//           events={events}
//           views={allViews}
//           startAccessor='startDate'
//           endAccessor='endDate'
//           scrollToTime={new Date(2010, 1, 1, 6)}
//           onSelectEvent={event => alert(event.title)}
//           onSelectSlot={slotInfo => {
//             alert(
//               `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
//                 `\nend: ${slotInfo.end.toLocaleString()}` +
//                 `\naction: ${slotInfo.action}`
//             )
//             this.handleSelect(slotInfo);
//           }}
//         />
//       </div>
//     );
//     return <div className="calendar-container">{MyCalendar()}</div>
//   }
// }