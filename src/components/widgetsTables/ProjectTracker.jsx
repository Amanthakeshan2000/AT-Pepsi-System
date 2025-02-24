import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import Pagination from '@/components/shared/Pagination'
import HorizontalProgress from '@/components/shared/HorizontalProgress'
import { projectsData } from '@/utils/fackData/projectsData'
import { FiBell, FiClock, FiGlobe, FiPrinter } from 'react-icons/fi'

const ProjectTracker = () => {
    const data = projectsData.trackerProjects
    return (
        <div className="col-lg-12">
            <div className="card stretch stretch-full">
                <CardHeader title={"Project Tracker"} />

                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Project</th>
                                    <th scope="col" className="w-25">Status</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Logged</th>
                                    <th scope="col" className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(({ comment, logged_time, progress, remaing_time, working_time, title, icon, brColor }, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="hstack gap-3">
                                                    <div className="avatar-text bg-soft-primary text-primary">
                                                        <FiClock size={16} />
                                                    </div>
                                                    <div>
                                                        <a href="#" className="fw-bold d-block mb-1">{title}</a>
                                                        <div className="d-flex gap-3">
                                                            <a href="#" className="hstack gap-1 fs-11 fw-normal text-muted">
                                                                <i className="feather-clock fs-10"></i>
                                                                <span>{remaing_time}</span>
                                                            </a>
                                                            <a href="#" className="hstack gap-1 fs-11 fw-normal text-muted">
                                                                <i className="feather-message-square fs-10"></i>
                                                                <span>{comment} comments</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="fs-12 fw-medium mb-2">{progress}% Completed</div>
                                                <HorizontalProgress progress={progress} barColor={brColor} />
                                            </td>
                                            <td>{working_time}</td>
                                            <td className="fw-bold">{logged_time}</td>
                                            <td>
                                                <div className="hstack gap-2 justify-content-end">
                                                    <a href="#" className="avatar-text avatar-md">
                                                        <FiGlobe strokeWidth={1.6} />
                                                    </a>
                                                    <a href="#" className="avatar-text avatar-md">
                                                        <FiPrinter strokeWidth={1.6} />
                                                    </a>
                                                    <a href="#" className="avatar-text avatar-md">
                                                        <FiBell />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer">
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default ProjectTracker
