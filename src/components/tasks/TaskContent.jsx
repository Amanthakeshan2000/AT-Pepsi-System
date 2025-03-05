import React, { useState } from 'react'
import { tasksListData } from '@/utils/fackData/tasksListData';
import { FiEdit, FiStar } from 'react-icons/fi';
import Dropdown from '@/components/shared/Dropdown';
import PerfectScrollbar from "react-perfect-scrollbar";
import TaskHeader from './TaskHeader';
import Footer from '@/components/shared/Footer';
import TaskSidebar from './TaskSidebar';

const actions = [
    { label: "Edit Task", icon: "" },
    { label: "View Task", icon: "" },
    { label: "Delete Task", icon: "" },
]
const TaskContent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const groupedTasks = groupTasksByDate(tasksListData);

    return (
        <>
            <TaskSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <div className='content-area'>
                <PerfectScrollbar>
                    <TaskHeader setSidebarOpen={setSidebarOpen} />
                    <div className="content-area-body">
                        {Object.keys(groupedTasks).map((group, index) => (
                            <div key={group} className="card stretch stretch-full" style={{ marginBottom: index === Object.keys(groupedTasks).length - 1 ? "0px" : "" }}>
                                <a
                                    href="#"
                                    className="card-header"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#tasks_collapse_${index}`}
                                >
                                    <h5 className="mb-0">{group}</h5>
                                </a>
                                <div className="card-body collapse show" id={`tasks_collapse_${index}`}>
                                    <ul className="list-unstyled mb-0">
                                        {groupedTasks[group].map(({ title, priority, taskType, user_img, priorityColor, priorityBgColor, taskTypeColor, taskTypeBgColor }, index) => (
                                            <List
                                                key={index}
                                                title={title}
                                                priority={priority}
                                                taskType={taskType}
                                                user_img={user_img}
                                                priorityColor={priorityColor}
                                                priorityBgColor={priorityBgColor}
                                                taskTypeColor={taskTypeColor}
                                                taskTypeBgColor={taskTypeBgColor}
                                            />
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        ))}

                    </div>
                    <Footer />
                </PerfectScrollbar>
            </div>
        </>
    )
}

export default TaskContent

const List = ({ title, priority, taskType, user_img, priorityColor, priorityBgColor, taskTypeColor, taskTypeBgColor }) => {
    return (
        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3 me-3">
                    <div className="custom-control custom-checkbox me-2">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheckTask1"
                            data-checked-action="task-action"
                        />
                        <label
                            className="custom-control-label c-pointer"
                            htmlFor="customCheckTask1"
                        />
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="lh-base">
                            <FiStar />
                        </div>
                        <a
                            href="#"
                            className="single-task-list-link"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#tasksDetailsOffcanvas"
                        >
                            <div className="fs-13 fw-bold text-truncate-1-line">
                                {title}
                                <span className={`ms-2 badge bg-${priorityBgColor} text-${priorityColor} text-capitalize`}>
                                    {priority}
                                </span>
                            </div>
                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            </div>
                        </a>
                    </div>
                </div>
                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                    <div className={`badge bg-${taskTypeBgColor} text-${taskTypeColor} d-md-inline-block d-none text-capitalize`}>
                        {taskType}
                    </div>
                    <div className="d-md-inline-block d-none me-3">27 Nov, 2023</div>
                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                        <img
                            src={user_img}
                            alt="user"
                            className="img-fluid"
                        />
                    </div>
                    <Dropdown dropdownItems={actions} triggerClass='avatar-md' />
                </div>
            </div>
        </li>
    )
}


const groupTasksByDate = (tasks) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const groupedTasks = {
        "Recently Assigned": [],
        "Yesterday": [],
    };

    tasks.forEach(task => {
        const taskDate = new Date(task.date);
        if (taskDate.toDateString() === today.toDateString()) {
            groupedTasks["Recently Assigned"].push(task);
        } else if (taskDate.toDateString() === yesterday.toDateString()) {
            groupedTasks["Yesterday"].push(task);
        }
        else {
            const weekStart = getStartOfWeekGroup(taskDate).toDateString();

            if (!groupedTasks[weekStart]) {
                groupedTasks[weekStart] = [];
            }
            groupedTasks[weekStart].push(task);
        }
    });

    return groupedTasks;
};

const getStartOfWeekGroup = (taskDate) => {
    const startOfWeekGroup = new Date(taskDate);
    // Move back to the nearest start of a 7-day block (if today is Day 0, it's the start)
    const dayOffset = taskDate.getDate() % 7;
    startOfWeekGroup.setDate(taskDate.getDate() - dayOffset);
    return startOfWeekGroup;
};




