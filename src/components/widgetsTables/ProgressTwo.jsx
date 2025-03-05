import React from 'react'
import Pagination from '@/components/shared/Pagination'
import CardHeader from '@/components/shared/CardHeader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'
import { FiBell, FiClock, FiMessageSquare } from 'react-icons/fi'
import { projectsData } from '@/utils/fackData/projectsData'


const ProgressTwo = ({ title }) => {
    const data = projectsData.trackerProjects
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project</th>
                                    <th>Status</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(({ title, comment, remaing_time }, index) => (
                                    <tr key={index} className="remaing_time-tracker-item">
                                        <td>
                                            <div className="avatar-text bg-soft-primary text-primary">
                                                <FiClock size={16}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fw-semibold mb-1">{title}</div>
                                            <div className="d-flex gap-3">
                                                <a href="#" className="hstack gap-1 fs-11 fw-normal text-muted">
                                                    <FiClock size={10} />
                                                    <span>{remaing_time}</span>
                                                </a>
                                                <a href="#" className="hstack gap-1 fs-11 fw-normal text-muted">
                                                    <FiMessageSquare size={10} />
                                                    <span>{comment} comments</span>
                                                </a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fs-12 fw-medium mb-2">86% Completed</div>
                                            <div className="progress ht-3">
                                                <div className="progress-bar bg-primary" role="progressbar" aria-valuenow={86} aria-valuemin={0} aria-valuemax={100} style={{ width: '86%' }} />
                                            </div>
                                        </td>
                                        <td className="text-end">
                                            <a href="#" className="btn btn-md btn-light-brand">
                                                <FiBell className='me-2' size={16} />
                                                <span>Remainder</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
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

export default ProgressTwo

