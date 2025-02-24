import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import CardHeader from '@/components/shared/CardHeader'
import Pagination from '@/components/shared/Pagination'
import { projectsData } from '@/utils/fackData/projectsData'
import { Link } from 'react-router-dom'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'

const Remainders = ({title}) => {
    const data = projectsData.remaindersProjects
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }

    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Remaining</th>
                                    <th scope="col">Stage</th>
                                    <th scope="col" className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(({ id, project_info, project_name, status, remaining_time, badgeColor }) =>
                                        <TableRow key={id} project_info={project_info} project_name={project_name} status={status} badgeColor={badgeColor} />
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                        <Pagination />
                    </div>
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default Remainders

const TableRow = ({ project_info, project_name, status, badgeColor }) => {
    return (
        <tr>
            <td>
                <div className="hstack gap-2">
                    <span className="wd-10 ht-10 bg-gray-400 rounded-circle d-inline-block me-2 lh-base"></span>
                    <div className="border-3 border-start rounded ps-3">
                        <Link to="#" className="mb-2 d-block">
                            <span>{project_name}</span>
                        </Link>
                        <p className="fs-12 text-muted mb-0">{project_info}</p>
                    </div>
                </div>
            </td>
            <td>
                <span className={`badge bg-soft-${badgeColor} text-${badgeColor}`}>{status}</span>
            </td>
            <td >
                <div className='countdown-container'>
                    <div className='countdown'>
                        <span>0</span>
                        <span>0</span>
                    </div>
                    <div className='seprator'>:</div>
                    <div className='countdown'>
                        <span>0</span>
                        <span>0</span>
                    </div>
                    <div className='seprator'>:</div>
                    <div className='countdown'>
                        <span>0</span>
                        <span>0</span>
                    </div>
                </div>
            </td>
            <td>
                <div className="hstack gap-1">
                    <div className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                    <div className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                    <div className="wd-15 ht-4 bg-success rounded-pill opacity-75"></div>
                    <div className="wd-15 ht-4 bg-warning rounded-pill opacity-75"></div>
                    <div className="wd-15 ht-4 bg-warning rounded-pill opacity-75"></div>
                    <div className="wd-15 ht-4 bg-gray-300 rounded-pill"></div>
                </div>
            </td>
            <td>
                <Link to="#" className="avatar-text avatar-md ms-auto">
                    <i><FiArrowRight /></i>
                </Link>
            </td>
        </tr>

    )
}