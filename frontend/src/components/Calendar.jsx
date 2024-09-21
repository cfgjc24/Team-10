import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// setup the localizer
const localizer = momentLocalizer(moment);

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // fake data
    const sampleAppointments = [
      {
        title: 'Meeting',
        start: new Date(2024, 8, 24, 10, 0), 
        end: new Date(2024, 8, 24, 11, 0),  
      },
      {
        title: 'Client Session',
        start: new Date(2024, 8, 25, 14, 0), // Sept 25, 2024, 2:00 PM
        end: new Date(2024, 8, 25, 15, 0),   // Sept 25, 2024, 3:00 PM
      },
      {
        title: 'Meeting',
        start: new Date(2024, 8, 27, 9, 0),  // Sept 27, 2024, 9:00 AM
        end: new Date(2024, 8, 27, 10, 0),   // Sept 27, 2024, 10:00 AM
      },
      {
        title: 'New date',
        start: new Date(2024, 8, 28, 13, 0), // Sept 28, 2024, 1:00 PM
        end: new Date(2024, 8, 28, 14, 0),   // Sept 28, 2024, 2:00 PM
      },
    ];

    setAppointments(sampleAppointments);
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = '#3174ad';
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style
    };
  };

  return (
    <div className="h-screen p-4">
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        defaultView="month"
        defaultDate={new Date()}
      />
    </div>
  );
};

export default AppointmentCalendar;
