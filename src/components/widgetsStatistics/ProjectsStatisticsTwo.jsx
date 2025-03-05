import React from 'react'
import { FiLink2 } from 'react-icons/fi';

const projectsData = [
    { status: 'Not Started', count: '04', description: 'Invoices Awaiting', amount: '$5,569', completionPercentage: 56, color: 'primary' },
    { status: 'In Progress', count: '06', description: 'Projects In Progress', amount: '16 Completed', completionPercentage: 78, color: 'success' },
    { status: 'Cancelled', count: '02', description: 'Converted Leads', amount: '52 Completed', completionPercentage: 63, color: 'warning' },
    { status: 'Finished', count: '25', description: 'Conversion Rate', amount: '$2,254', completionPercentage: 46, color: 'danger' }
];


const ProjectsStatisticsTwo = () => {
    return (
        <>
            {projectsData.map(({ status, count, description, amount, completionPercentage, color }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className={`card bg-soft-${color} text-${color} border-${color} border-dashed`}>
                        <div className="card-body">
                            <a href="#" className="fw-bold d-block text-reset">
                                <span className="d-block">{status}</span>
                                <span className="fs-24 fw-bolder d-block">{count}</span>
                            </a>
                            <div className="pt-4">
                                <div className="d-flex align-items-center justify-content-between">
                                    <a href="#" className="fs-12 fw-medium text-reset">
                                        <span>{description}</span>
                                        <i className="fs-11 ms-1" ><FiLink2 /></i>
                                    </a>
                                    <div>
                                        <span className="fs-12 text-reset">{amount}</span>
                                        <span className="fs-11 text-reset">({completionPercentage}%)</span>
                                    </div>
                                </div>
                                <div className="progress mt-2 ht-3">
                                    <div className={`progress-bar bg-${color}`} role="progressbar" style={{ width: `${completionPercentage}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ProjectsStatisticsTwo