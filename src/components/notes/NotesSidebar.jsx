import React from 'react'
import { FiArchive, FiBriefcase, FiCast, FiCheckCircle, FiCommand, FiLayers, FiPlus, FiStar, FiTool, FiUser, FiX } from 'react-icons/fi'
import { notesData } from '@/utils/fackData/notesData'
import PerfectScrollbar from 'react-perfect-scrollbar'

const NotesSidebar = ({ setSelectTab, selectTab, sidebarOpen, setSidebarOpen }) => {
    const filteredCategory = ["alls"]
    notesData.forEach(({ category }) => {
        if (!filteredCategory.includes(category)) {
            filteredCategory.push(category)
        }
    })

    return (
        <div className={`content-sidebar content-sidebar-md ${sidebarOpen ? "app-sidebar-open" : ""}`}>
            <PerfectScrollbar>
                <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                    <h4 className="fw-bolder mb-0">Notes</h4>
                    <a href="#" className="app-sidebar-close-trigger d-flex" onClick={() => setSidebarOpen(false)}>
                        <FiX />
                    </a>
                </div>
                <div className="content-sidebar-header">
                    <a href="#" className="btn btn-primary w-100" id="add-notes" data-bs-toggle="modal" data-bs-target="#addNewNotes">
                        <FiPlus size={17} className='me-2' />
                        <span>Add Notes</span>
                    </a>
                </div>
                <div className="content-sidebar-body">
                    <ul className="nav d-flex flex-column nxl-content-sidebar-item">
                        {
                            filteredCategory.map((category) => (
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        className={`nav-link note-link text-capitalize ${selectTab === category ? "active" : ""} `}
                                        onClick={() => setSelectTab(category)}
                                    >
                                        {getIcon(category)}
                                        <span>{category}</span>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default NotesSidebar

const getIcon = (category) => {
    switch (category) {
        case "alls":
            return <FiLayers size={16} />
        case "tasks":
            return <FiCheckCircle size={16} />
        case "important":
            return <FiStar size={16} />
        case "works":
            return <FiTool size={16} />
        case "business":
            return <FiBriefcase size={16} />
        case "archive":
            return <FiArchive size={16} />
        case "personal":
            return <FiUser size={16} />
        case "priority":
            return <FiCommand size={16} />
        case "social":
            return <FiCast size={16} />

        default:
            break;
    }
}