import React, { useEffect, useState } from 'react';
import SelectDropdown from '@/components/shared/SelectDropdown';
import { eventCategoryOptions, eventOptions } from './AddEventForm';
import { FiCalendar, FiMapPin, FiTag } from 'react-icons/fi';
import Datetime from "react-datetime";
import { format, isValid } from 'date-fns';

const EditEventForm = ({ event, onSubmit }) => {
    const [title, setTitle] = useState(event.title);
    const [location, setLocation] = useState(event.extendedProps.details.location);
    const [details, setDetails] = useState(event.extendedProps.details.details);
    const [selectedCategory, setSelectedCategory] = useState(eventCategoryOptions[0]);
    const [position, setPosition] = useState(eventOptions[0]);
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [allDay, setAllDay] = useState(false)


    const timeConverter = (time) => ({
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
    });

    const combineDateTime = (date, currentTime) => (
        new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            currentTime.getHours(),
            currentTime.getMinutes(),
            currentTime.getSeconds()
        )
    )


    useEffect(() => {
        const currentTime = new Date();
        const startDate = new Date(event.start); // this event.srtat is props event
        const endDate = new Date(event.end);

        const handleDate = (date, setter, addOneHour = false) => {
            if (isValid(date)) {
                const { hours, minutes, seconds } = timeConverter(date);
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    const newDate = combineDateTime(date, currentTime);
                    setter(addOneHour ? new Date(newDate).setHours(newDate.getHours() + 1) : newDate);
                } else {
                    setter(date);
                }
            }
        };

        handleDate(startDate, setStartDate);
        handleDate(endDate, setEndDate, true); // Add one hour to the end date if time is midnight
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedEvent = {
            ...event,
            title,
            category: selectedCategory.value,
            start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
            end: format(endDate, "yyyy-MM-dd'T'HH:mm"),
            details: {
                location: location,
                position: position.value,
                details: details,
                dotColor: selectedCategory.color
            },
            allDay: allDay
        };

        onSubmit(updatedEvent);
    };

    const handleStarteDateChange = (date) => {
        setStartDate(date._d)
    }
    const handleEndDateChange = (date) => {
        setEndDate(date._d)
    }


    return (
        <form onSubmit={handleSubmit}>

            <div className="d-flex flex-lg-row flex-column gap-lg-4 gap-3 mb-3">
                <SelectDropdown
                    options={eventCategoryOptions}
                    defaultSelect={event.extendedProps.category}
                    selectedOption={selectedCategory}
                    onSelectOption={(option) => setSelectedCategory(option)}
                    className={"w-100"}
                />
                <SelectDropdown
                    options={eventOptions}
                    defaultSelect={event.extendedProps.details.position}
                    selectedOption={position}
                    onSelectOption={(option) => setPosition(option)}
                    className={"w-100"}
                />
            </div>
            <div className="input-container d-flex gap-3 mb-3">
                <div className="input-group border">
                    <div className='border-end h-100 wd-40 d-flex align-items-center justify-content-center'>
                        <FiTag size={16} />
                    </div>
                    <input type="text" placeholder="Subject" value={title} onChange={(e) => setTitle(e.target.value)} required className='form-control' />
                </div>
                {/* <div className='border  wd-40 d-flex align-items-center justify-content-center'> <CiLock size={16} /> </div> */}
            </div>
            <div className="input-container d-flex gap-3 mb-3">
                <div className="input-group border">
                    <div className='border-end h-100 wd-40 d-flex align-items-center justify-content-center'>
                        <FiMapPin size={16} />
                    </div>
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className='form-control' />
                </div>
            </div>

            <div className="w-100 mb-3">
                <textarea className='form-control border ps-3' placeholder='Description' value={details} onChange={(e) => setDetails(e.target.value)} />
            </div>
            <div className='d-flex flex-lg-row flex-column gap-lg-4 gap-3 mb-3'>
                <div className='input-group date border'>
                    <div className='border-end ht-40 wd-40 d-flex align-items-center justify-content-center'>
                        <FiCalendar size={16} />
                    </div>
                    <Datetime
                        timeFormat={allDay ? false : "HH:mm"}
                        dateFormat="YYYY-MM-DD"
                        closeOnSelect={true}
                        className='rdt-calender'
                        value={startDate}
                        onChange={handleStarteDateChange}
                    />
                </div>
                <div className='input-group date border'>
                    <div className='border-end t-40 wd-40 d-flex align-items-center justify-content-center'>
                        <FiCalendar size={16} />
                    </div>
                    <Datetime
                        timeFormat={allDay ? false : "HH:mm"}
                        dateFormat="YYYY-MM-DD"
                        closeOnSelect={true}
                        className='rdt-calender'
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
                <div className='wd-40 ht-40 d-flex justify-content-center align-items-center border '>
                    <input type="checkbox" name="allday" id="check" defaultChecked={false} onChange={(e) => setAllDay(e.target.checked)} />
                </div>
            </div>

            <button type="submit" className='btn btn-primary w-100'>Save Changes</button>
        </form>

    );
};

export default EditEventForm;
