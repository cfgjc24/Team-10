import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventForm from './EventForm';

const localizer = momentLocalizer(moment);

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const sampleAppointments = [
      {
        title: 'Meeting',
        start: new Date(2024, 8, 24, 10, 0), 
        end: new Date(2024, 8, 24, 11, 0),  
      },
    ];

    setAppointments(sampleAppointments);
  }, []);

  const addEvent = (event) => {
    setAppointments((prev) => [...prev, event]);
  };

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
    return { style };
  };

  return (
    <div className="h-screen p-4">
      <EventForm addEvent={addEvent} /> {/* Include the form here */}
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
