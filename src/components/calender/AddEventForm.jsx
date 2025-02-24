import React, { useEffect, useState } from 'react';
import { CiLock } from 'react-icons/ci';
import SelectDropdown from '@/components/shared/SelectDropdown';
import { FiCalendar, FiMapPin, FiTag } from 'react-icons/fi';
import { add, format, isValid } from 'date-fns';
import Datetime from "react-datetime";

export const eventCategoryOptions = [
    { label: "Office", value: "Office", color: "#5485e4" },
    { label: "Family", value: "Family", color: "rgb(37, 184, 101)" },
    { label: "Friend", value: "Friend", color: "rgb(209, 59, 76)" },
    { label: "Travel", value: "Travel", color: "rgb(23, 162, 184)" },
    { label: "Private", value: "Private", color: "rgb(228, 158, 61)" },
    { label: "Holidays", value: "Holidays", color: "rgb(88, 86, 214)" },
    { label: "Company", value: "Company", color: "rgb(61, 199, 190)" },
    { label: "Birthdays", value: "Birthdays", color: "rgb(71, 94, 119)" },
]

export const eventOptions = [
    { label: "Free", value: "free" },
    { label: "Busy", value: "busy" },
]

const AddEventForm = ({ eventDate, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
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
        const convertStartDate = new Date(eventDate.start); // this eventDate.srtat is props eventDate
        const convertEndDate = new Date(eventDate.end);

        const handleDate = (date, setter, addOneHour = false) => {
            if (isValid(date)) {
                const { hours, minutes, seconds } = timeConverter(date);
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    const newDate = combineDateTime(date, currentTime);
                    setter(addOneHour ? new Date(newDate).setHours(newDate.getHours() + 1) : newDate);
                } else {
                    setter(addOneHour ? new Date(date).setHours(date.getHours() + 1) : date);
                }
            }
        };

        handleDate(convertStartDate, setStartDate);
        handleDate(convertEndDate, setEndDate, true); // Add one hour to the end date if time is midnight
    }, [eventDate])

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            id: Date.now().toString(),
            title: title,
            category: selectedCategory.value,
            start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
            end: format(allDay ? add(new Date(endDate), { days: 1 }) : endDate, "yyyy-MM-dd'T'HH:mm"),
            details: {
                location: location,
                position: position.value,
                details: details,
                dotColor: selectedCategory.color
            },
            allDay: allDay
        };

        onSubmit(newEvent);
    };

    const handleStarteDateChange = (date) => {
        setStartDate(date._d)
    }
    const handleEndDateChange = (date) => {
        setEndDate(date._d)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-lg-row flex-column gap-lg-4 gap-3 mb-3">
                    <SelectDropdown
                        options={eventCategoryOptions}
                        defaultSelect={"Office"}
                        selectedOption={selectedCategory}
                        onSelectOption={(option) => setSelectedCategory(option)}
                        className={"w-100"}
                    />
                    <SelectDropdown
                        options={eventOptions}
                        defaultSelect={"busy"}
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
                    <textarea className='form-control border ps-3' placeholder='Description' onChange={(e) => setDetails(e.target.value)} />
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
                        <div className='border-end ht-40 wd-40 d-flex align-items-center justify-content-center'>
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

                <button type="submit" className='btn btn-primary w-100'>Add Event</button>
            </form>
        </>
    );
};

export default AddEventForm;
