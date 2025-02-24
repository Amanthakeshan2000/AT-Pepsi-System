import React from 'react'
import { FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const TimesheetsModal = () => {
    return (
        <div className="dropdown nxl-h-item">
            <div className="nxl-head-link me-0" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                <FiClock size={20} />
                <span className="badge bg-success nxl-h-badge">2</span>
            </div>
            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-timesheets-menu">
                <div className="d-flex justify-content-between align-items-center timesheets-head">
                    <h6 className="fw-bold text-dark mb-0">Timesheets</h6>
                    <Link to={"#"} className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Upcomming Timers">
                        <FiClock size={16} className='me-1' />
                        <span >3 Upcomming</span>
                    </Link>
                </div>
                <div className="d-flex justify-content-between align-items-center flex-column timesheets-body">
                    <i className="feather-clock fs-1 mb-4"></i>
                    <p className="text-muted">No started timers found yes!</p>
                    <button className="btn btn-sm btn-primary">Started Timer</button>
                </div>
                <div className="text-center timesheets-footer">
                    <Link to={"#"} className="fs-13 fw-semibold text-dark">Alls Timesheets</Link>
                </div>
            </div>
        </div>
    )
}

export default TimesheetsModal