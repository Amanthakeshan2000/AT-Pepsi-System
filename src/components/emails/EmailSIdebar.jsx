import React from 'react'
import { FiBell, FiEdit, FiInbox, FiInfo, FiPlus, FiSend, FiStar, FiTrash2, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PerfectScrollbar from "react-perfect-scrollbar";
const EmailSIdebar = ({setSidebarOpen, sidebarOpen}) => {
    return (
        <div className={`content-sidebar content-sidebar-md ${sidebarOpen ? "app-sidebar-open" : ""}`}>
            <PerfectScrollbar>
                <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                    <h4 className="fw-bolder mb-0">Email</h4>
                    <Link to="#" className="app-sidebar-close-trigger d-flex" onClick={()=>setSidebarOpen(false)}>
                        <i><FiX /></i>
                    </Link>
                </div>
                <div className="content-sidebar-header">
                    <Link to="#" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#composeMail">
                        <i className="me-2"><FiPlus size={16} /></i>
                        <span>Compose</span>
                    </Link>
                </div>
                <div className="content-sidebar-body">
                    <ul className="nav flex-column nxl-content-sidebar-item">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center justify-content-between" to="#">
                                <span className="d-flex align-items-center">
                                    <FiInbox size={16} className="me-3" />
                                    <span>Inbox</span>
                                </span>
                                <span className="badge bg-soft-primary text-primary">5</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <FiSend size={16} />
                                <span>Send</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <FiEdit size={16} />
                                <span>Draft</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center justify-content-between" to="#">
                                <span className="d-flex align-items-center">
                                    <FiInbox size={16} className="me-3" />
                                    <span>Spam</span>
                                </span>
                                <span className="badge bg-soft-danger text-danger">7</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <FiTrash2 size={16} />
                                <span>Delete</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav flex-column nxl-content-sidebar-item">
                        <li className="px-4 my-2 fs-10 fw-bold text-uppercase text-muted text-spacing-1 d-flex align-items-center justify-content-between">
                            <span>Label</span>
                            <Link to="#">
                                <span className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Add New"><FiPlus /> </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <span className="wd-7 ht-7 bg-primary rounded-circle"></span>
                                <span>Work</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <span className="wd-7 ht-7 bg-warning rounded-circle"></span>
                                <span>Partnership</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <span className="wd-7 ht-7 bg-teal rounded-circle"></span>
                                <span>In Progress</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <span className="wd-7 ht-7 bg-danger rounded-circle"></span>
                                <span>Personal</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <span className="wd-7 ht-7 bg-success rounded-circle"></span>
                                <span>Payments</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav flex-column nxl-content-sidebar-item">
                        <li className="px-4 my-2 fs-10 fw-bold text-uppercase text-muted text-spacing-1 d-flex align-items-center justify-content-between">
                            <span>Filter</span>
                            <Link to="#">
                                <span className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Add New"><FiPlus /></span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <FiStar size={16} />
                                <span>Favorite</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <FiBell size={16} />
                                <span>Snoozed</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center justify-content-between" to="#">
                                <span className="d-flex align-items-center">
                                    <FiInfo size={16} className="me-3" />
                                    <span>Important</span>
                                </span>
                                <span className="badge bg-soft-success text-success">3</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default EmailSIdebar