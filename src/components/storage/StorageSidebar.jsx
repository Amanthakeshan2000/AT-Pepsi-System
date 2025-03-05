import React from 'react'
import { FiBell, FiClock, FiFolder, FiHome, FiImage, FiInfo, FiPlus, FiSettings, FiShare2, FiStar, FiUpload, FiVideo, FiX } from 'react-icons/fi'
import Checkbox from '@/components/shared/Checkbox'
import PerfectScrollbar from "react-perfect-scrollbar";

const filterMembers = ["Alls", "Users", "Editor", "Admin", "Contributor", "Administrator"]

const StorageSidebar = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <div className={`content-sidebar content-sidebar-md ${sidebarOpen ? "app-sidebar-open" : ""}`}>
      <PerfectScrollbar>
        <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
          <h4 className="fw-bolder mb-0">Storage</h4>
          <a href="#" className="app-sidebar-close-trigger d-flex" onClick={() => setSidebarOpen(false)}>
            <i><FiX /></i>
          </a>
        </div>
        <div className="content-sidebar-header">
          <a href="#" className="btn btn-primary w-100">
            <FiUpload size={16} className="me-2" />
            <span>Upload Files</span>
          </a>
        </div>
        <div className="content-sidebar-body">
          <ul className="nav flex-column nxl-content-sidebar-item">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FiHome size={16} strokeWidth={1.6} />
                <span>Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FiImage size={16} strokeWidth={1.6} />
                <span>Images</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FiVideo size={16} strokeWidth={1.6} />
                <span>Videos</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center justify-content-between" href="#">
                <span className="d-flex align-items-center">
                  <FiFolder size={16} strokeWidth={1.6} className="me-3" />
                  <span>Folders</span>
                </span>
                <span className="badge bg-soft-danger text-danger">7</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FiClock size={16} strokeWidth={1.6} />
                <span>History</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FiSettings size={16} strokeWidth={1.6} />
                <span>Settings</span>
              </a>
            </li>
          </ul>
          <ul className="nav flex-column nxl-content-sidebar-item">
            <li className="px-4 my-2 fs-10 fw-bold text-uppercase text-muted text-spacing-1 d-flex align-items-center justify-content-between">
              <span>Members</span>
              <a href="#">
                <span className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Add New"> <FiPlus /> </span>
              </a>
            </li>
            {
              filterMembers.map((name, index) => (
                <li className="nav-item">
                  <div className="nav-link">
                    <Checkbox name={name} id={index} checked={index === 3 || index === 5} />
                  </div>
                </li>
              ))
            }
          </ul>
          <ul className="nav flex-column nxl-content-sidebar-item">
            <li className="px-4 mx-2 my-2 fs-10 fw-bold text-uppercase text-muted text-spacing-1 d-flex align-items-center justify-content-between">
              <span>Filter</span>
              <a href="#">
                <span className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Add New"> <FiPlus /> </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FiClock size={16} strokeWidth={1.6} />
                <span>Recent</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FiStar size={16} strokeWidth={1.6} />
                <span>Favorite</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FiBell size={16} strokeWidth={1.6} />
                <span>Snoozed</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center justify-content-between" href="#">
                <span className="d-flex align-items-center">
                  <FiInfo size={16} strokeWidth={1.6} className='me-3' />
                  <span>Important</span>
                </span>
                <span className="badge bg-soft-success text-success">3</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FiShare2 size={16} strokeWidth={1.6} />
                <span>Shared Files</span>
              </a>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default StorageSidebar