import React from 'react'
import { FiCalendar, FiX } from 'react-icons/fi'
import ReactDatetimeClass from 'react-datetime'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Datetime from "react-datetime";
import { upcomingScheduleList } from '@/utils/fackData/upcomingScheduleList';
import ImageGroup from '@/components/shared/ImageGroup';

const CalenderSidebar = ({ selectedCategories, handleCategoryChange, handleAllCategory, selectAll,  sidebarOpen, setSidebarOpen, handleEventBtnClick  }) => {
  return (
    <div className={`content-sidebar content-sidebar-xl ${sidebarOpen ? "app-sidebar-open" : ""}`}>
      <PerfectScrollbar>
        <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
          <h4 className="fw-bolder mb-0">Calendar</h4>
          <a href="#" className="app-sidebar-close-trigger d-flex" onClick={()=>setSidebarOpen(false)}>
            <FiX />
          </a>
        </div>
        <div className="content-sidebar-header" onClick={(e)=>handleEventBtnClick(e)}>
          <a href="#" id="btn-new-schedule" className="btn btn-primary w-100" data-toggle="modal" >
            <FiCalendar size={16} className='me-2' />
            <span>New Event</span>
          </a>
        </div>

        <div className="content-sidebar-body">
          <div id="lnb-calendars" className="lnb-calendars">
            <div className="lnb-calendars-item">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="viewAllSchedules" value="all" checked={selectAll} onChange={(e) => handleAllCategory(e)} />
                <label className="custom-control-label c-pointer" htmlFor="viewAllSchedules">
                  <span className="fs-13 fw-semibold lh-lg d-inline-block" style={{ marginTop: "-3px" }}>View All Schedules</span>
                </label>
              </div>
            </div>
            <div id="calendarList" className="lnb-calendars-d1">
              {Object.keys(selectedCategories).map((category) => (
                <div key={category} className='filter-item'>
                  <div className="custom-control custom-checkbox" data-category={`${category}`}>
                    <input type="checkbox" className="custom-control-input" id={category} value="all" checked={selectedCategories[category]} onChange={() => handleCategoryChange(category)} />
                    <label className="custom-control-label c-pointer" htmlFor={category}>
                      <span className="fs-13 fw-semibold lh-lg d-inline-block" style={{ marginTop: "-3px" }}>{category}</span>
                    </label>
                  </div>
                  {/* <Checkbox id={category} name={category} checked={selectedCategories[category]}  onChange={() => handleCategoryChange(category)} /> */}
                </div>
              ))}
            </div>
            <h2 className="px-4 fs-10 fw-bold text-uppercase my-4 text-muted text-spacing-1 text-truncate-1-line">Events &amp; Schedules</h2>
          </div>
          {
            upcomingScheduleList.map(({ date, id, schedule_name, team_members, color }) => (
              <div key={id} className="p-4 border-top c-pointer single-item schedule-item">
                <div className="d-flex align-items-start">
                  <div className={`wd-50 ht-50 bg-soft-${color} text-${color} lh-1 d-flex align-items-center justify-content-center flex-column rounded-2 schedule-date`}>
                    <span className="fs-18 fw-bold mb-1 d-block">{date.day}</span>
                    <span className="fs-10 text-semibold text-uppercase d-block">{date.month}</span>
                  </div>
                  <div className="ms-3 schedule-body">
                    <div className="text-dark">
                      <h6 className="fw-bold my-1 text-truncate-1-line">{schedule_name}</h6>
                      <span className="fs-11 fw-normal text-muted">8:00am - 9:00am, Engineering Room</span>
                      <p className="fs-12 fw-normal text-muted my-3 text-truncate-2-line">Lorem ipsum quia dolor sit amet, consectetur, adipisci velit, abore et dolore magnam aliquam quaerat voluptatem.</p>
                    </div>
                    <div className="img-group lh-0 ms-3 justify-content-start">
                      <ImageGroup data={team_members} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default CalenderSidebar