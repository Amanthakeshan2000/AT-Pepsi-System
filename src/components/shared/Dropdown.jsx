import React from 'react'

import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';
import { FiMoreVertical } from 'react-icons/fi';

const Dropdown = ({
    triggerPosition,
    triggerClass = "avatar-sm",
    triggerIcon,
    triggerText,
    dropdownItems = [],
    dropdownPosition = "dropdown-menu-end",
    dropdownAutoClose,
    dropdownParentStyle,
    dataBsToggle = "modal",
    tooltipTitle,
    dropdownMenuStyle,
    iconStrokeWidth = 1.7,
    isItemIcon = true,
    isAvatar = true,
    onClick,
    active,
    id
}) => {

    return (
        <>
            <div className={`filter-dropdown ${dropdownParentStyle}`}>
                {/* Dropdown Trigger */}
                {
                    tooltipTitle ?
                        <span className="d-flex c-pounter" data-bs-toggle="dropdown" data-bs-offset={triggerPosition} data-bs-auto-close={dropdownAutoClose}>
                            {
                                isAvatar ?
                                    <div className={`avatar-text ${triggerClass}`} data-bs-toggle="tooltip" data-bs-trigger="hover" title={tooltipTitle} >
                                        {triggerIcon || <FiMoreVertical />} {triggerText}
                                    </div>
                                    :
                                    <div className={`${triggerClass}`} data-bs-toggle="tooltip" data-bs-trigger="hover" title={tooltipTitle}>
                                        {triggerIcon || <FiMoreVertical />} {triggerText}
                                    </div>
                            }
                        </span>
                        :
                        isAvatar ?
                            <Link to="#" className={`avatar-text ${triggerClass}`} data-bs-toggle="dropdown" data-bs-offset={triggerPosition} data-bs-auto-close={dropdownAutoClose} >
                                {triggerIcon || <FiMoreVertical />} {triggerText}
                            </Link>
                            :
                            <Link to="#" className={`${triggerClass}`} data-bs-toggle="dropdown" data-bs-offset={triggerPosition} data-bs-auto-close={dropdownAutoClose} >
                                {triggerIcon || <FiMoreVertical />} {triggerText}
                            </Link>
                }


                {/* Dropdown Menu */}
                <ul className={`dropdown-menu ${dropdownMenuStyle} ${dropdownPosition}`}>
                    {dropdownItems.map((item, index) => {
                        if (item.type === "divider") {
                            return <li className="dropdown-divider" key={index}></li>;
                        }
                        return (
                            <li key={index} className={`${item.checkbox ? "dropdown-item" : ""}`}>
                                {
                                    item.checkbox ?
                                        <Checkbox checked={item.checked} id={item.id} name={item.label} className={""} />
                                        :

                                        <Link to={item.link || "#"} target='_blank' className={`${active === item.label ? "active" : ""} dropdown-item`}
                                            data-bs-toggle={item.link || dataBsToggle} data-bs-target={item.modalTarget} onClick={() => onClick(item.label, id)}
                                        >
                                            {
                                                isItemIcon ?
                                                    item.icon && React.cloneElement(item.icon, { className: "me-3", size: 16, strokeWidth: iconStrokeWidth })
                                                    :
                                                    <span className={`wd-7 ht-7 rounded-circle me-3 ${item.color}`}></span>
                                            }
                                            <span>{item.label}</span>
                                        </Link>
                                }
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}

export default Dropdown