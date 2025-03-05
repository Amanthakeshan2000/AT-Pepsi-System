import React, { useEffect, useRef, useState } from 'react'
import { FiAlertOctagon, FiAlertTriangle, FiArchive, FiArrowLeft, FiBell, FiBellOff, FiBookmark, FiCalendar, FiEye, FiEyeOff, FiInfo, FiLink2, FiPlus, FiSlash, FiSliders, FiStar, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown'
import ReactQuill from 'react-quill';
import TaskDateRange from './TaskDateRange';
import TaskStatus from './TaskStatus';
import Comments from '../Comments';
import MultiSelectTags from '@/components/shared/MultiSelectTags';
import MultiSelectImg from '@/components/shared/MultiSelectImg';
import { taskAssigneeOptions, taskLabelsOptions, taskPriorityOptions, taskStatusOptions, taskTypeOptions } from '@/utils/options';
import topTost from '@/utils/topTost';
import CheckList from '../CheckList';

const detailsMoreOptions = [
    { label: "Make Unread", icon: <FiEyeOff /> },
    { label: "Filter Messages", icon: <FiSliders /> },
    { label: "Make as Archive", icon: <FiArchive /> },
    { type: "divider" },
    { label: "Attach files", icon: <FiLink2 /> },
    { label: "Set Due Date", icon: <FiCalendar />, },
    { label: "Follow Task", icon: <FiEye />, },
    { label: "Apply Labels", icon: <FiBookmark />, },
    { type: "divider" },
    { label: "Report Spam", icon: <FiAlertTriangle /> },
    { label: "Report phishing", icon: <FiAlertOctagon /> },
    { type: "divider" },
    { label: "Mute Conversion", icon: <FiBellOff /> },
    { label: "Block Conversion", icon: <FiSlash /> },
    { label: "Delete Conversion", icon: <FiTrash2 /> },
];


const TasksDetails = () => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);
  
    const handleClick = () => {
        topTost()
    };
    return (
        <div
            className="offcanvas offcanvas-end w-50"
            tabIndex={-1}
            id="tasksDetailsOffcanvas"
        >
            <div
                className="offcanvas-header border-bottom"
                style={{ paddingTop: 20, paddingBottom: 20 }}
            >
                <div className="d-flex align-items-center">
                    <div
                        className="avatar-text avatar-md items-details-close-trigger"
                        data-bs-dismiss="offcanvas"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        title="Details Close"
                    >
                        <FiArrowLeft />
                    </div>
                    <span className="vr text-muted mx-4" />
                    <a href="#">
                        <h2 className="fs-14 fw-bold text-truncate-1-line">
                            Video conference with Canada Team
                        </h2>
                        <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                            09:00am - 11:00am, Rangpur, Bangladesh.
                        </span>
                    </a>
                </div>
                <div className="d-none d-md-flex gap-1 align-items-center justify-content-center">
                    <a
                        href="#"
                        className="d-none d-lg-flex align-items-center fs-9 fw-bold text-uppercase text-dark py-2 px-3 border border-gray-2 rounded"
                    >
                        <FiLink2 size={16} strokeWidth={1.7} className='me-2' />
                        <span className="text-nowrap">Copy Link</span>
                    </a>
                    <a href="#" className="d-flex">
                        <div
                            className="avatar-text avatar-md"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            title="Add Contractors"
                        >
                            <FiPlus strokeWidth={1.6} />
                        </div>
                    </a>
                    <a href="#" className="d-flex" onClick={handleClick}>
                        <div
                            className="avatar-text avatar-md"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            title="Remainder Notify"
                        >
                            <FiBell strokeWidth={1.6} />
                        </div>
                    </a>
                    <a href="#" className="d-flex" onClick={handleClick}>
                        <div
                            className="avatar-text avatar-md"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            title="Add to Favorite"
                        >
                            <FiStar strokeWidth={1.6} />
                        </div>
                    </a>
                    <a href="#" className="d-flex" onClick={handleClick}>
                        <div
                            className="avatar-text avatar-md"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            title="Add to Calendar"
                        >
                            <FiCalendar strokeWidth={1.6} />
                        </div>
                    </a>
                    <Dropdown
                        triggerClass='avatar-md'
                        tooltipTitle="More Options"
                        dropdownItems={detailsMoreOptions}
                        triggerPosition={"0,25"}
                    />

                </div>
            </div>
            <div className="offcanvas-body">
                <div className="row">
                    <div className="col-sm-6">
                        <TaskStatus label={"Status:"} options={taskStatusOptions} defaultSelect="inprogress" />
                    </div>
                    <div className="col-sm-6">
                        <TaskStatus options={taskPriorityOptions} label={"Priority:"} defaultSelect="high" />
                    </div>
                    <div className="col-sm-6">
                        <TaskStatus options={taskLabelsOptions} label={"Labels:"} defaultSelect="promotions" />
                    </div>
                    <div className="col-sm-6">
                        <TaskStatus options={taskTypeOptions} label={"Types:"} defaultSelect="new" />
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group mb-4">
                            <label className="form-label">Tags:</label>
                            <MultiSelectTags options={taskLabelsOptions} defaultSelect={[taskLabelsOptions[2]]} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group mb-4">
                            <label className="form-label">Assignee:</label>
                            <MultiSelectImg options={taskAssigneeOptions} defaultSelect={[taskAssigneeOptions[1]]} />
                        </div>
                    </div>
                    <TaskDateRange />
                </div>
                <hr className="my-5" />
                <div className="checklist">
                    <div className="d-flex justify-content-between mb-4">
                        <div>
                            <h2 className="fs-16 fw-bold mb-1">Checklist</h2>
                            <span className="fs-12 text-muted">Issues found checklist</span>
                        </div>
                        <a href="#" className="avatar-text avatar-md">
                            <FiInfo />
                        </a>
                    </div>
                    <CheckList />
                </div>
                <hr className="my-5" />
                {/*! BEGIN: Notes !*/}
                <div className="notes">
                    <div className="d-flex justify-content-between mb-4">
                        <div>
                            <h2 className="fs-16 fw-bold mb-1">Notes</h2>
                            <span className="fs-12 text-muted">Task note list</span>
                        </div>
                        <a href="#" className="avatar-text avatar-md">
                            <FiInfo />
                        </a>
                    </div>
                    <div className="editor task-editor ht-250 ">
                        <ReactQuill ref={inputRef} theme="snow" value={value} onChange={setValue} className="ht-200 border-0" />
                    </div>
                </div>
                {/*! END: Notes !*/}
                <hr className="my-5" />
                <div className="comments">
                    <div className="d-flex justify-content-between mb-4">
                        <div>
                            <h2 className="fs-16 fw-700 mb-1">Comments</h2>
                            <small className="text-muted">Responses for this tasks</small>
                        </div>
                        <a href="#" className="avatar-text avatar-md">
                            <FiInfo />
                        </a>
                    </div>
                    <Comments />
                    <div className="pt-4">
                        <label className="mb-1">Add Comment</label>
                        <textarea
                            rows={5}
                            className="form-control"
                            placeholder="Your comment...."
                            defaultValue={""}
                        />
                        <a
                            href="#"
                            className="btn btn-primary d-inline-block mt-4"
                        >
                            Add Comment
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TasksDetails

