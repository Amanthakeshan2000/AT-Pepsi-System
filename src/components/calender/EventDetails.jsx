import { format, isValid } from 'date-fns';
import React from 'react'
import { FiEdit, FiMapPin, FiSun, FiTrash } from 'react-icons/fi'

const formatEventTimeTwo = (date) => {
    const parsedDate = new Date(date); // Convert to Date object

    // Check if the parsed date is valid
    if (isValid(parsedDate)) {
        const hours = parsedDate.getHours();
        const minutes = parsedDate.getMinutes();
        const seconds = parsedDate.getSeconds();

        // Check if the time is midnight (00:00:00)
        if (hours === 0 && minutes === 0 && seconds === 0) {
            // If it's midnight, return the date without time, or use default '12:00 AM'
            return format(parsedDate, 'yyyy.MM.dd 12:00 a');
        } else {
            // If it's not midnight, format the full date with time
            return format(parsedDate, 'yyyy.MM.dd hh:mm a');
        }
    } else {
        return 'Invalid date'; // Handle invalid date
    }
};


const EventDetails = ({ selectedEvent, handleEditEvent, handleDeleteEvent }) => {
    return (
        <>
            <div className='edit-delete-modal'>
                <h2 className='edit-delete-modal-title'>{selectedEvent.title}</h2>
                <small>Start: {formatEventTimeTwo(selectedEvent.start)}</small>
                <small>End: {formatEventTimeTwo(selectedEvent.end)}</small>

                <p className='edit-delete-modal-location mb-0'><FiMapPin size={14} /> {selectedEvent.extendedProps.details.location}</p>
                <p className='edit-delete-modal-category mb-0'> <span style={{ background: selectedEvent.extendedProps.details.dotColor }}></span> {selectedEvent.extendedProps.category}</p>
                <p className='edit-delete-modal-posotion mb-0'><FiSun size={14} /> {selectedEvent.extendedProps.details.position}</p>

                <p className='edit-delete-modal-details'>{selectedEvent.extendedProps.details.details}</p>

                <div className="modal-buttons">
                    <button onClick={handleEditEvent} className='btn btn-primary wd-150 d-flex gap-2'> <FiEdit size={13} /> Edit</button>
                    <button onClick={handleDeleteEvent} className='btn btn-danger wd-150 d-flex gap-2'><FiTrash size={13} /> Delete</button>
                </div>
            </div>
        </>
    )
}

export default EventDetails