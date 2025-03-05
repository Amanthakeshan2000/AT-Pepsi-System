import React from 'react'
import { FiActivity, FiAirplay, FiArrowRight, FiAtSign, FiBarChart2, FiBell, FiCalendar, FiCheck, FiCheckCircle, FiClipboard, FiClock, FiDollarSign, FiEdit, FiEdit3, FiFileText, FiLifeBuoy, FiPlus, FiPower, FiSettings, FiStar, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown'
import CheckList from '../CheckList'
import MultiSelectImg from '@/components/shared/MultiSelectImg'
import MultiSelectTags from '@/components/shared/MultiSelectTags'
import { taskAssigneeOptions } from '@/utils/options'

const checkListOptions = [
    { label: "New", icon: <FiAtSign /> },
    { label: "Event", icon: <FiCalendar /> },
    { label: "Snoozed", icon: <FiBell /> },
    { label: "Deleted", icon: <FiTrash2 /> },
    { type: "divider" },
    { label: "Settings", icon: <FiSettings />, },
    { label: "Tips & Tricks", icon: <FiLifeBuoy />, },
]

const tags = [
    { value: 'team', label: 'Team', color: '#3454d1' },
    { value: 'primary', label: 'Primary', color: '#41b2c4' },
    { value: 'updates', label: 'Updates', color: '#17c666' },
    { value: 'personal', label: 'Personal', color: '#ffa21d' },
    { value: 'promotions', label: 'Promotions', color: '#ea4d4d' },
    { value: 'custom', label: 'Custom', color: '#6610f2' },
    { value: 'important', label: 'Important', color: '#17c666' },
    { value: 'tomorrow', label: 'Tomorrow', color: '#283c50' },
    { value: 'review', label: 'Review', color: '#3dc7be' },
]

const status = [
    { label: "In Progress", color: "bg-primary" },
    { label: "Pending", color: "bg-secondary" },
    { label: "Completed", color: "bg-success" },
    { label: "Rejected", color: "bg-danger" },
    { label: "Upcoming", color: "bg-warning" },
];
const priority = [
    { label: "Low", color: "bg-primary" },
    { label: "Normal", color: "bg-secondary" },
    { label: "Medium", color: "bg-success" },
    { label: "High", color: "bg-warning" },
    { label: "Urgent", color: "bg-danger" },
];

const TasksTabContent = () => {
    return (
        <div className="tab-pane fade" id="tasksTab">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card stretch stretch-full">
                        <div className="card-body task-header d-lg-flex align-items-center justify-content-between">
                            <div className="mb-4 mb-lg-0">
                                <h4 className="mb-3 fw-bold text-truncate-1-line">Duralux || CRM Applications & Admin Dashboar</h4>
                                <span className="badge bg-soft-primary text-primary me-2">In Prograss</span>
                                <span className="badge bg-soft-warning text-warning">Recurring Task </span>
                            </div>
                            <div className="d-flex gap-2">
                                <a href="#" className="btn btn-icon" data-bs-toggle="tooltip" title="Make as Complete">
                                    <FiCheckCircle strokeWidth={1.6} size={16} />
                                </a>
                                <a href="#" className="btn btn-icon" data-bs-toggle="tooltip" title="Timesheets">
                                    <FiCalendar strokeWidth={1.6} size={16} />
                                </a>
                                <a href="#" className="btn btn-icon" data-bs-toggle="tooltip" title="Statistics">
                                    <FiBarChart2 strokeWidth={1.6} size={16} />
                                </a>
                                <a href="#" className="btn btn-success" data-bs-toggle="tooltip" title="Timesheets">
                                    <FiClock size={17} className='me-2' />
                                    <span>Start Timer</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-8 col-xl-6">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Description</h5>
                            <a href="#" className="avatar-text avatar-md" data-bs-toggle="tooltip" title="Update Description">
                                <FiEdit strokeWidth={1.6} />
                            </a>
                        </div>
                        <div className="card-body">
                            <p>Web Design Company is still a broad term and refers to any company that specializes in designing and creating websites. These companies typically offer a range of services including website design, development, and maintenance. They may also offer other related services such as search engine optimization (SEO), e-commerce solutions, and website hosting.</p>
                            <ul className="list-unstyled text-muted mb-0">
                                <li className="d-flex align-items-start mb-3">
                                    <span className="avatar-text avatar-sm bg-soft-success text-success me-3">
                                        <FiCheck className='fs-10' />
                                    </span>
                                    <span>Participated in the initial wave of developers learning and implementing the React.JS library. </span>
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="avatar-text avatar-sm bg-soft-success text-success me-3">
                                        <FiCheck className='fs-10' />
                                    </span>
                                    <span>Tested, debugged, and shipped 10s of 1000s of lines of code to various development teams. This lead to 100% bug-free deployment. </span>
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="avatar-text avatar-sm bg-soft-success text-success me-3">
                                        <FiCheck className='fs-10' />
                                    </span>
                                    <span>Introduced Kanban Board style ticketing system to promote highly efficient asynchronous and synchronous work, increasing efficiency by 12%. </span>
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="avatar-text avatar-sm bg-soft-success text-success me-3">
                                        <FiCheck className='fs-10' />
                                    </span>
                                    <span>Utilized HTML, CSS, and JavaScript to create 100+ responsive landing pages for both company and client. </span>
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="avatar-text avatar-sm bg-soft-success text-success me-3">
                                        <FiCheck className='fs-10' />
                                    </span>
                                    <span>Tested, debugged, and shipped 10s of 1000s of lines of code to various development teams. This lead to 100% bug-free deployment. </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Checklist</h5>
                            <Dropdown triggerClass='avatar-md' triggerPosition={"25, 25"} tooltipTitle={"Options"} dropdownItems={checkListOptions} />
                        </div>
                        <div className="card-body task-checklist">
                            <CheckList />
                        </div>
                    </div>
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Topics</h5>
                            <a href="#" className="btn btn-md btn-light-brand">
                                <FiPlus size={16} className='me-2' />
                                <span>Add New Topic</span>
                            </a>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xxl-6">
                                    <Card
                                        title="How to upload data to the system?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to draw a land plot on a map?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to to view expire services?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to integrate new web applications?"
                                        link="#"
                                    />
                                    <Card
                                        title="How do I set the geometry of an object?"
                                        link="#"
                                    />
                                </div>
                                <div className="col-xxl-6">
                                    <Card
                                        title="How to upload data to the system?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to draw a land plot on a map?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to to view expire services?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to integrate new web applications?"
                                        link="#"
                                    />
                                    <Card
                                        title="How do I set the geometry of an object?"
                                        link="#"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-6">
                    <div className="card stretch stretch-full">
                        <div className="card-body task-info">
                            <div className="mb-4">
                                <h5 className="card-title mb-1">Task Info</h5>
                                <span className="fs-12 fw-normal text-muted d-block">Created at 2023-02-12 08:47:47</span>
                            </div>
                            <div className="task-info-list">
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiStar size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Status:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">In Progress</span>
                                        <Dropdown
                                            triggerIcon={<FiEdit3 />}
                                            triggerClass='avatar-sm'
                                            dropdownParentStyle={"ms-2"}
                                            isItemIcon={false}
                                            dropdownItems={status}
                                        />
                                    </div>
                                </div>
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiAirplay size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Priority:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">Medium</span>
                                        <Dropdown
                                            triggerIcon={<FiEdit3 />}
                                            triggerClass='avatar-sm'
                                            dropdownParentStyle={"ms-2"}
                                            isItemIcon={false}
                                            dropdownItems={priority}
                                        />
                                    </div>
                                </div>
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiActivity size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Start Date:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">26 May, 2023</span>
                                        <div className="ms-2">
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiEdit3 />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiCalendar size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Due Date:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">30 May, 2023</span>
                                        <div className="ms-2">
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiEdit3 />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiClock size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Hourly Rate:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">$12.00</span>
                                        <div className="ms-2">
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiEdit3 />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiClipboard size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Billable:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">Billable</span>
                                        <div className="ms-2">
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiEdit3 />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiDollarSign size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Amount:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">$250.00</span>
                                        <div className="ms-2">
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiEdit3 />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiPower size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Login:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">09:30AM</span>
                                        <div className="ms-2">
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiEdit3 />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <FiBell size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Remainders:</span>
                                    </div>
                                    <div className="col-6">
                                        <a href="#" className="text-primary">Create Remain</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card stretch stretch-full">
                        <div className="card-body task-tags">
                            <div className="mb-4">
                                <h5 className="card-title mb-1">Tags</h5>
                                <span className="fs-12 fw-normal text-muted d-block">Tags label for tasks</span>
                            </div>
                            <MultiSelectTags options={tags} defaultSelect={[tags[0], tags[3], tags[8], tags[6]]} />
                        </div>
                    </div>
                    <div className="card stretch stretch-full">
                        <div className="card-body task-assignees">
                            <div className="mb-4">
                                <h5 className="card-title mb-1">Assignees</h5>
                                <span className="fs-12 fw-normal text-muted d-block">Assigne member to this tasks</span>
                            </div>
                            <MultiSelectImg options={taskAssigneeOptions} defaultSelect={[taskAssigneeOptions[1], taskAssigneeOptions[3], taskAssigneeOptions[4]]} />
                        </div>
                    </div>
                    <div className="card stretch stretch-full">
                        <div className="card-body task-followers">
                            <div className="mb-4">
                                <h5 className="card-title mb-1">Followers</h5>
                                <span className="fs-12 fw-normal text-muted d-block">5 followers for this task</span>
                            </div>
                            <MultiSelectImg options={taskAssigneeOptions} defaultSelect={[taskAssigneeOptions[1], taskAssigneeOptions[3], taskAssigneeOptions[4]]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TasksTabContent

const Card = ({ icon: Icon, title, link }) => {
    return (
        <div className="card border border-gray-2 rounded-2 my-2 overflow-hidden">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="wd-50 ht-50 bg-gray-100 me-3 d-flex align-items-center justify-content-center">
                        {/* <Icon /> */}
                        <FiFileText />
                    </div>
                    <a href={link}>{title}</a>
                </div>
                <a href={link} className="avatar-text avatar-sm me-3">
                    <FiArrowRight />
                </a>
            </div>
        </div>
    );
};
