import React, { useState } from 'react'
import Dropdown from '@/components/shared/Dropdown'
import { emailActions, emailMoreOptions, tagsItems } from '../emails/EmailHeader'
import { FiActivity, FiAirplay, FiAlignLeft, FiArrowLeft, FiCheckCircle, FiChevronLeft, FiChevronRight, FiClock, FiEye, FiFolderPlus, FiHash, FiPlus, FiSearch, FiTag } from 'react-icons/fi'
import HeaderSearchForm from '@/components/shared/pageHeader/HeaderSearchForm'

export const taskOptions = [
    { label: "All Tasks", icon: <FiHash /> },
    { label: "My Tasks", icon: <FiCheckCircle /> },
    { label: "Overviews", icon: <FiAirplay /> },
    { label: "Pending Tasks", icon: <FiClock /> },
    { label: "InProgress Tasks", icon: <FiActivity /> },
]

export const taskFilter = [
    { label: "Title", icon: "" },
    { label: "Priority", icon: "" },
    { label: "Category", icon: "" },
    { label: "Time & Date", icon: "" },
    { type: "divider" },
    { label: "Newest", icon: "" },
    { label: "Oldest", icon: "" },
    { type: "divider" },
    { label: "Ascending", icon: "" },
    { label: "Descending", icon: "" },
]
export const labels = [
    {
        id: "l_item_1",
        label: "Updates",
        checkbox: true,
        checked: true,
    },
    {
        id: "l_item_2",
        label: "Socials",
        checkbox: true,
        checked: false,
    },
    {
        id: "l_item_3",
        label: "Primary",
        checkbox: true,
        checked: true,
    },
    {
        id: "l_item_4",
        label: "Forums",
        checkbox: true,
        checked: false,
    },
    {
        id: "l_item_5",
        label: "Promotions",
        checkbox: true,
        checked: false,
    },
    { type: "divider" },
    { label: "Create Tag", icon: <FiPlus /> },
    { label: "Manages Tag", icon: <FiTag /> },
];


const TaskHeader = ({ setSidebarOpen }) => {
    const [active, setActive] = useState("Newest")
    const handleFilter = (e) => {
        setActive(e)
    }
    return (
        <div className="content-area-header sticky-top">
            <div className="page-header-left d-flex align-items-center gap-2">
                <a href="#" className="app-sidebar-open-trigger me-2" onClick={() => setSidebarOpen(true)}>
                    <FiAlignLeft className='fs-20' />
                </a>
                <Dropdown
                    dropdownItems={taskOptions}
                    triggerIcon={<FiCheckCircle size={16} className='me-2' />}
                    triggerText="My Tasks"
                    triggerPosition={"0,18"}
                    triggerClass='btn btn-light-brand dropdown-toggle'
                    isAvatar={false}
                />
                <Dropdown
                    dropdownItems={emailActions}
                    triggerIcon={<FiEye />}
                    triggerPosition={"0,22"}
                    triggerClass='avatar-md'
                />
                <Dropdown
                    dropdownItems={tagsItems}
                    triggerIcon={<FiTag />}
                    triggerPosition={"0,22"}
                    triggerClass='avatar-md'
                    dropdownAutoClose='outside'
                    tooltipTitle={"Tags"}
                />

                <Dropdown
                    dropdownItems={labels}
                    triggerIcon={<FiFolderPlus />}
                    triggerPosition={"0,22"}
                    triggerClass='avatar-md'
                    dropdownAutoClose='outside'
                    tooltipTitle={"Labels"}
                />

            </div>
            <div className="page-header-right ms-auto">
                <div className="hstack gap-2">
                    <HeaderSearchForm />
                    <a href="#" className="d-none d-sm-flex">
                        <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Newest">
                            <FiChevronLeft />
                        </div>
                    </a>
                    <a href="#" className="d-none d-sm-flex">
                        <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Oldest">
                            <FiChevronRight />
                        </div>
                    </a>

                    <Dropdown
                        dropdownItems={taskFilter}
                        triggerPosition={"0,23"}
                        triggerClass='btn btn-light-brand btn-sm rounded-pill dropdown-toggle'
                        isAvatar={false}
                        triggerIcon={active}
                        dropdownPosition='dropdown-menu-start'
                        dropdownParentStyle={"d-none d-sm-flex"}
                        onClick={handleFilter}
                        active={active}
                    />
                    <Dropdown
                        dropdownItems={emailMoreOptions}
                        triggerPosition={"0,22"}
                        triggerClass='avatar-md'
                        tooltipTitle={"More Options"}
                        dropdownParentStyle={"d-none d-sm-flex"}
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskHeader