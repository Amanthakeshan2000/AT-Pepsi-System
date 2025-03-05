import React from 'react'

const projectsData = [
    { status: 'Not Started', count: '04', description: 'Invoices Awaiting', completedCount: '$5,569', percentage: '56', progressBarColor: 'bg-primary', progressBarWidth: '56%' },
    { status: 'In Progress', count: '06', description: 'Projects In Progress', completedCount: '16 Completed', percentage: '78', progressBarColor: 'bg-success', progressBarWidth: '78%' },
    { status: 'Cancelled', count: '02', description: 'Converted Leads', completedCount: '52 Completed', percentage: '63', progressBarColor: 'bg-warning', progressBarWidth: '63%' },
    { status: 'Finished', count: '25', description: 'Conversion Rate', completedCount: '$2,254', percentage: '46', progressBarColor: 'bg-danger', progressBarWidth: '46%' }
];

const ProjectsStatistics = () => {
    return (
        <>
            {projectsData.map(({ completedCount, count, description, percentage, progressBarColor, progressBarWidth, status}, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className="card stretch stretch-full">
                        <div className="card-body">
                            <a href="#" className="fw-bold d-block">
                                <span className="d-block">{status}</span>
                                <span className="fs-24 fw-bolder d-block">{count}</span>
                            </a>
                            <div className="pt-4">
                                <div className="d-flex align-items-center justify-content-between">
                                    <a href="#" className="fs-12 fw-medium text-muted">
                                        <span>{description}</span>
                                        <i className="feather-link-2 fs-10 ms-1" />
                                    </a>
                                    <div>
                                        <span className="fs-12 text-muted">{completedCount}</span>
                                        <span className="fs-11 text-muted">({percentage}%)</span>
                                    </div>
                                </div>
                                <div className="progress mt-2 ht-3">
                                    <div className={`progress-bar ${progressBarColor}`} role="progressbar" style={{ width: progressBarWidth }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ProjectsStatistics