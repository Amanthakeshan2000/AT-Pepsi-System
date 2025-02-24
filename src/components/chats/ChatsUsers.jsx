import React, { Fragment, useState } from 'react'
// import Dropdown from './dropdown'
import { userList } from '@/utils/fackData/userList'
import { Link } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown'
import { FiAlertTriangle, FiArchive, FiBellOff, FiCheckCircle, FiMail, FiMoreVertical, FiPhoneCall, FiStar, FiTrash2, FiVideo } from 'react-icons/fi'
import PerfectScrollbar from "react-perfect-scrollbar";

const filteringOptions = ["Oldest", "Newest", "Replied", "Snoozed", "Ascending", "Descending", "Mute Conversion", "Block Conversion", "Delete Conversion"]

const chatItems = [
  { label: "Make as Read", icon: <FiCheckCircle /> },
  { label: "Add to Favorite", icon: <FiStar /> },
  { label: "Mute Notifications", icon: <FiBellOff /> },
  { type: "divider" },
  { label: "Audio Call", icon: <FiPhoneCall />, modalTarget: "#voiceCallingModalScreen" },
  { label: "Video Call", icon: <FiVideo />, modalTarget: "#videoCallingModalScreen" },
  { label: "Send eMail", icon: <FiMail /> },
  { type: "divider" },
  { label: "Report Chat", icon: <FiAlertTriangle /> },
  { label: "Delete Chat", icon: <FiTrash2 /> },
  { label: "Archive Chat", icon: <FiArchive /> },
];

const ChatsUsers = ({ sidebarOpen, setSidebarOpen }) => {
  const [selectOption, setSelectOption] = useState("Newest")

  return (
    <div className={`content-sidebar content-sidebar-xl ${sidebarOpen ? "app-sidebar-open" : ""}`}>
      <PerfectScrollbar>
        <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
          <h4 className="fw-bolder mb-0">Chat</h4>
          <a href="#" className="app-sidebar-close-trigger d-flex" onClick={()=>setSidebarOpen(false)}>
            <FiX size={16} />
          </a>
        </div>
        <div className="content-sidebar-body">
          <div className="py-0 px-4 d-flex align-items-center justify-content-between border-bottom">
            <form className="sidebar-search">
              <input type="search" className="py-3 px-0 border-0" id="chattingSearch" placeholder="Search..." />
            </form>
            <div
              className="filter-dropdown sidebar-filter"
            >
              <a
                href="#"
                data-bs-toggle="dropdown"
                className="d-flex align-items-center justify-content-center dropdown-toggle"
                data-bs-offset="0, 15"
              >
                {selectOption}
              </a>
              <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                {
                  filteringOptions.map((option, index) => (
                    <Fragment key={index}>
                      {index === 4 && <li className="dropdown-divider"></li>}
                      <li onClick={() => setSelectOption(option)}>
                        <Link to="#" className={`dropdown-item ${selectOption === option ? "active" : ""} `}>{option}</Link>
                      </li>
                      {index === 5 && <li className="dropdown-divider"></li>}
                    </Fragment>
                  ))
                }

              </ul>
            </div>
          </div>
          <div
            className="content-sidebar-items"
          >
            {
              userList().map(({ id, user_img, user_name, active_time, is_active, is_message_read }) => {
                return (
                  <div
                    key={id}
                    className="p-4 d-flex position-relative border-bottom c-pointer single-item chat-single-item"
                  >
                    {
                      user_img ?
                        <div className="avatar-image">
                          <img
                            src={user_img}
                            className="img-fluid"
                            alt="image"
                          />
                        </div>
                        :
                        <div className="text-white avatar-text user-avatar-text">{user_name.substring(0, 1)}</div>
                    }

                    <div className="ms-3 item-desc">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <a href="#" className="hstack gap-2 me-2">
                          <span>{user_name}</span>
                          <div className={`wd-5 ht-5 rounded-circle opacity-75 me-1`} style={{ background: is_active.color }}></div>
                          <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">{active_time}</span>
                        </a>
                        <Dropdown dropdownItems={chatItems} />
                      </div>
                      <p className={`fs-12 fw-semibold mt-2 mb-0 text-truncate-2-line ${is_message_read ? "" : "text-dark"}`}>
                        Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <a href="#" className="content-sidebar-footer px-4 py-3 fs-11 text-uppercase d-block text-center">Load More</a>
      </PerfectScrollbar>
    </div>
  )
}

export default ChatsUsers