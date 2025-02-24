import React from 'react'
import { Link } from 'react-router-dom'

const MegaMenuApplicationsTab = () => {
    return (
        <div className="tab-pane fade" id="v-pills-applications" role="tabpanel">
            <div className="row g-4">
                <div className="col-lg-6">
                    <h6 className="dropdown-item-title">Applications</h6>
                    <Link to="/applications/chat" className="dropdown-item">
                        <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                        <span>Chat</span>
                    </Link>
                    <Link to="/applications/email" className="dropdown-item">
                        <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                        <span>Email</span>
                    </Link>
                    <Link to="/applications/tasks" className="dropdown-item">
                        <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                        <span>Tasks</span>
                    </Link>
                    <Link to="/applications/notes" className="dropdown-item">
                        <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                        <span>Notes</span>
                    </Link>
                    <Link to="/applications/storage" className="dropdown-item">
                        <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                        <span>Storage</span>
                    </Link>
                    <Link to="/applications/calendar" className="dropdown-item">
                        <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                        <span>Calendar</span>
                    </Link>
                </div>
                <div className="col-lg-6">
                    <div className="nxl-mega-menu-image">
                        <img src="/images/general/full-avatar.png" alt="" className="img-fluid full-user-avtar" />
                    </div>
                </div>
            </div>
            <hr className="border-top-dashed" />
            <div className="d-lg-flex align-items-center justify-content-between">
                <div>
                    <h6 className="menu-item-heading text-truncate-1-line">Need more application?</h6>
                    <p className="fs-12 text-muted mb-0 text-truncate-3-line">We are ready to build custom applications.</p>
                </div>
                <div className="mt-2 mt-lg-0">
                    <Link to="/mailto:themeocean91@gmail.com" className="fs-13 fw-bold text-primary">Contact Us &rarr;</Link>
                </div>
            </div>
        </div>
    )
}

export default MegaMenuApplicationsTab