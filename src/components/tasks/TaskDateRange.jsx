import React from 'react'
import DatePicker from "react-datepicker";
import useDatePicker from '@/hooks/useDatePicker';

const TaskDateRange = () => {
    const { startDate, endDate, setStartDate, setEndDate, renderFooter } = useDatePicker();


    return (
        <div className="col-12 ">
            <div className=''>
                <label className="form-label">Date Range:</label>
                <div className="input-group date  ">
                    <DatePicker
                        placeholderText='Start date...'
                        selected={startDate}
                        showPopperArrow={false}
                        onChange={(date) => setStartDate(date)}
                        className='form-control'
                        popperPlacement="bottom-start"
                        calendarContainer={({ children }) => (
                            <div className='bg-white react-datepicker'>
                                {children}
                                {renderFooter("start")}
                            </div>
                        )}
                    />
                    <span className="input-group-text">to</span>
                    <DatePicker
                        placeholderText='End date...'
                        selected={endDate}
                        showPopperArrow={false}
                        onChange={(date) => setEndDate(date)}
                        className='form-control'
                        popperPlacement="bottom-start"
                        calendarContainer={({ children }) => (
                            <div className='bg-white react-datepicker'>
                                {children}
                                {renderFooter("end")}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskDateRange