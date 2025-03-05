import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';

const EventCalendarSmall = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState('');
  const [events, setEvents] = useState({});

  // Function to handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);

  };

  // Function to add a new event
  const addEvent = () => {
    const dateKey = selectedDate.toDateString();
    const time = new Date().getTime();

    if (newEvent.trim()) {
      setEvents((prevEvents) => {
        const existingEvents = prevEvents[dateKey] || [];

        const eventDetails = {
          event_name: newEvent,
          event_time: time
        };

        return {
          ...prevEvents,
          [dateKey]: [...existingEvents, eventDetails]
        };
      });

      setNewEvent('');
    }
  };


  // Render a symbol (dot) if the day has events
  const tileContent = ({ date, view }) => {
    const dateKey = date.toDateString();
    if (events[dateKey] && events[dateKey].length > 0) {
      return <span className="event-dot">●</span>;
    }
    return null;
  };


  // format header month view
  const formatMonthYear = (locale, date) => {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return <> <span className='month'>{month}</span> <span className='year'>{year}</span></>;
  };

  useEffect(() => {
    setEvents(
      {
        "Fri Oct 18 2024": [
          {
            "event_name": "React admin dashboard design",
            "event_time": 1728196224368
          }
        ],
        "Tue Oct 08 2024": [
          {
            "event_name": "Meeting for campaign with sales team",
            "event_time": 1728196222368
          }
        ],
        "Tue Oct 15 2024": [
          {
            "event_name": "NFT Mobile Apps Developemnt",
            "event_time": 1728196309987
          }
        ]
      }
    )
  }, [])



  return (
    <div className='calendar-container'>
      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
        value={selectedDate}
        className={""}
        prev2Label={null}
        next2Label={null}
        formatMonthYear={formatMonthYear}
      />

      {selectedDate && (
        <div className='event-container'>
          <span onClick={() => setSelectedDate(null)} className='event-container__close'><FaTimes /></span>

          <div>
            {(events[selectedDate.toDateString()] || []).map((event, index) => (
              <div key={index} className="event">
                <div className="event-hour">{format(event?.event_time, 'HH:mm')}</div>
                <div className="event-date">{format(selectedDate, 'EEEE - d MMM')}</div>
                <div className="event-summary">{event?.event_name}</div>
              </div>
            ))}
          </div>

          <div className='d-flex align-items-end'>
            <input
              type="text"
              placeholder="Add event"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
            <button onClick={addEvent}>Add Event</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCalendarSmall;
