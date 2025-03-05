import React from 'react'
import Pagination from '@/components/shared/Pagination'
import CardHeader from '@/components/shared/CardHeader'
import { projectsData } from '@/utils/fackData/projectsData'
import { FiArrowRight } from 'react-icons/fi'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'

const ProjectsTwo = ({ title, className }) => {
    const data = projectsData.projectsStats
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className={className}>
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive project-report-table">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Project</th>
                                    <th scope="col">Budgets</th>
                                    <th scope="col">Stage</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(({ budgets, id, progress, project_logo, project_name, project_owner, status, badgeColor }) => (
                                        <tr key={id}>
                                            <td>
                                                <div className="hstack gap-4">
                                                    <div className="avatar-image ounded">
                                                        <img src={project_logo} alt="" className="img-fluid" />
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold text-dark">{project_name}</div>
                                                        <div className="fs-12 text-muted">Project: <a href="#" className="fw-normal text-muted border-bottom border-bottom-dashed">{project_owner}</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="fw-bold text-dark">${budgets} USD</span></td>
                                            <td>
                                                <div className="hstack gap-1">
                                                    {getProgressBar(progress)}
                                                </div>
                                            </td>
                                            <td>
                                                <div className={`badge bg-soft-${badgeColor} text-${badgeColor}`}>{status}</div>
                                            </td>
                                            <td>
                                                <a href="#" className="avatar-text avatar-md ms-auto"><FiArrowRight /></a>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer"><Pagination /></div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default ProjectsTwo


const getProgressBar = (progress) => {
    if (progress === 100) {
        return (
            <>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                ))}
            </>
        )
    }
    else if (70 <= progress) {
        return (
            <>
                <div className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                <div className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                <div className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                <div className="wd-15 ht-4 bg-warning rounded-pill opacity-75"></div>
                <div className="wd-15 ht-4 bg-warning rounded-pill opacity-75"></div>
                <div className="wd-15 ht-4 bg-gray-300 rounded-pill"></div>
            </>
        )
    }
    else if (progress <= 69) {
        return (
            <>
                <div className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                <div className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                <div className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                <div className="wd-15 ht-4 bg-warning rounded-pill opacity-75"></div>
                <div className="wd-15 ht-4 bg-gray-300 rounded-pill"></div>
                <div className="wd-15 ht-4 bg-gray-300 rounded-pill"></div>

            </>
        )
    }
}