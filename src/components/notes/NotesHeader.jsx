import React, { useState } from 'react'
import Dropdown from '@/components/shared/Dropdown'
import { emailActions, emailMoreOptions, tagsItems } from '../emails/EmailHeader'
import { FiAlignLeft, FiChevronLeft, FiChevronRight, FiEye, FiFolderPlus, FiTag } from 'react-icons/fi'
import { labels, taskFilter } from '../tasks/TaskHeader'
import HeaderSearchForm from '@/components/shared/pageHeader/HeaderSearchForm'

const projectOptions = [
    { label: "All Notes", icon: '' },
    { label: "Lead Notes", icon: '' },
    { label: "Client Notes", icon: '' },
    { label: "Project Notes", icon: '' },
    { label: "Meeting Notes", icon: '' },
    { label: "Personal Notes", icon: '' },
    { label: "Customer Notes", icon: '' },
]
const NotesHeader = ({ setSidebarOpen }) => {
    const [active, setActive] = useState("Newest")
    const [projectFilter, setProjectFilter] = useState("Project Notes")
    const handleFilter = (e) => {
        setActive(e)
    }
    const handleProject = (e) => {
        setProjectFilter(e)
    }
    return (
        <div className="content-area-header sticky-top">
            <div className="page-header-left d-flex align-items-center gap-2">
                <a href="#" className="app-sidebar-open-trigger me-2" onClick={() => setSidebarOpen(true)}>
                    <FiAlignLeft className='fs-20' />
                </a>
                <Dropdown
                    dropdownItems={projectOptions}
                    triggerIcon={' '}
                    triggerText={projectFilter}
                    triggerPosition={"0,18"}
                    triggerClass='btn btn-light-brand dropdown-toggle'
                    isAvatar={false}
                    dropdownPosition='dropdown-menu-start'
                    onClick={handleProject}
                    active={projectFilter}
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

export default NotesHeader