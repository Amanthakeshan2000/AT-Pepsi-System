import React from "react";
import {
  FiAtSign,
  FiBell,
  FiCalendar,
  FiLifeBuoy,
  FiMoreVertical,
  FiSettings,
  FiTrash,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const CardHeader = ({ title, refresh, remove, expanded }) => {
  return (
    <div className="card-header">
      <h5 className="card-title">{title}</h5>
      <div className="card-header-action">
        <div className="card-header-btn">
          <div data-bs-toggle="tooltip" title="Delete" onClick={remove}>
            <span
              className="avatar-text avatar-xs bg-danger"
              data-bs-toggle="remove"
            >
              {" "}
            </span>
          </div>
          <div data-bs-toggle="tooltip" title="Refresh" onClick={refresh}>
            <span
              className="avatar-text avatar-xs bg-warning"
              data-bs-toggle="refresh"
            >
              {" "}
            </span>
          </div>
          <div
            data-bs-toggle="tooltip"
            title="Maximize/Minimize"
            onClick={expanded}
          >
            <span
              className="avatar-text avatar-xs bg-success"
              data-bs-toggle="expand"
            >
              {" "}
            </span>
          </div>
        </div>
        <div className="filter-dropdown">
          <div
            className="avatar-text avatar-sm"
            data-bs-toggle="dropdown"
            data-bs-offset="25, 25"
          >
            <div data-bs-toggle="tooltip" title="Options" className="lh-1">
              <FiMoreVertical />
            </div>
          </div>
          <div className="dropdown-menu dropdown-menu-end">
            <Link to="#" className="dropdown-item">
              <i>
                <FiAtSign />
              </i>
              New
            </Link>
            <Link to="#" className="dropdown-item">
              <i>
                <FiCalendar />
              </i>
              Event
            </Link>
            <Link to="#" className="dropdown-item">
              <i>
                <FiBell />
              </i>
              Snoozed
            </Link>
            <Link to="#" className="dropdown-item">
              <i>
                <FiTrash />
              </i>
              Deleted
            </Link>
            <div className="dropdown-divider"></div>
            <Link to="#" className="dropdown-item">
              <i>
                <FiSettings />
              </i>
              Settings
            </Link>
            <Link to="#" className="dropdown-item">
              <i>
                <FiLifeBuoy />
              </i>
              Tips & Tricks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
