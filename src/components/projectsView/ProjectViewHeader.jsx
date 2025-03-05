import React from 'react'
import { FiMoreVertical, FiPlus, FiShare2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import getIcon from '@/utils/getIcon'

const socialLinkOptions = [
    { label: "Github", icon: "feather-github", shareCount: "39.57K" },
    { label: "Twitter", icon: "feather-twitter", shareCount: "64.37K" },
    { label: "Youtube", icon: "feather-youtube", shareCount: "53.76K" },
    { label: "Linkedin", icon: "feather-linkedin", shareCount: "42.69K" },
    { label: "Facebook", icon: "feather-facebook", shareCount: "95.65K" },
    { label: "Instagram", icon: "feather-instagram", shareCount: "32.69K" },
    { type: "divider" },
    { label: "Copy Link", icon: "feather-link", shareCount: "" },
    { label: "Share via QR", icon: "feather-grid", shareCount: "" },
    { label: "Share via Email", icon: "feather-mail", shareCount: "" },
    { label: "Share via Message", icon: "feather-message-square", shareCount: "" },
]
const moreOptions = [
    { label: "Pin Project", icon: "feather-map-pin" },
    { label: "Edit Project", icon: "feather-edit" },
    { label: "Copy Project", icon: "feather-copy" },
    { type: "divider" },
    { label: "Make as Hold", icon: "feather-pause" },
    { label: "Make as Started", icon: "feather-star" },
    { label: "Make as Finished", icon: "feather-check-circle" },
    { label: "Make as Cancelled", icon: "feather-delete" },
    { type: "divider" },
    { label: "Export Project", icon: "feather-cast" },
    { label: "Project View", icon: "feather-eye" },
    { type: "divider" },
    { label: "Delete Project", icon: "feather-trash-2" },
]
const ProjectViewHeader = () => {
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <div className="filter-dropdown">
                <a className="btn btn-icon btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                    <i className='lh-1'><FiMoreVertical /></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                    {
                        moreOptions.map(({ icon, label, type }, index) => {
                            if (type === "divider") {
                                return <li key={index} className="dropdown-divider"></li>
                            }
                            return (
                                <li key={index}>
                                    <a href="#" className="dropdown-item">
                                        <i className='me-3'>{getIcon(icon)}</i>
                                        <span>{label}</span>
                                    </a>
                                </li>
                            )
                        })
                    }
                </div>
            </div>
            <Link to="/projects/create" className="btn btn-primary">
                <FiPlus size={16} className='me-2' />
                <span>Create Project</span>
            </Link>
            <div className="filter-dropdown">
                <a href="#" className="btn btn-primary" data-bs-toggle="dropdown" data-bs-offset="0,11">
                    <FiShare2 size={16} className='me-2' />
                    <span>Share Project</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-start">
                    {
                        socialLinkOptions.map(({ icon, label, shareCount, type }, index) => {
                            if (type === "divider") {
                                return <li key={index} className="dropdown-divider"></li>
                            }
                            return (
                                <li key={index}>
                                    <a href="#" className="dropdown-item">
                                        <i className='me-3'>{getIcon(icon)}</i>
                                        <span>{label}</span>
                                        <span className="fs-10 text-gray-500 ms-2">({shareCount})</span>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>


    )
}

export default ProjectViewHeader