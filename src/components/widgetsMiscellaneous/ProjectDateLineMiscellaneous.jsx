import React from 'react'
import { Link } from 'react-router-dom'
import CircleProgress from '@/components/shared/CircleProgress'

const projectData = [
    { project_name: 'NFT Mobile Apps Developemnt', progress: '40', progress_color: '#ea4d4d', deadiline: '20 days left' },
    { project_name: 'NFT Mobile Apps Developemnt', progress: '85', progress_color: '#3454d1', deadiline: '18 days left' },
    { project_name: 'NFT Mobile Apps Developemnt', progress: '50', progress_color: '#ffa21d', deadiline: '16 days left' },
    { project_name: 'NFT Mobile Apps Developemnt', progress: '75', progress_color: '#17c666', deadiline: '10 days left' }
];

const ProjectDateLineMiscellaneous = () => {
    return (
        <div className="col-12">
            <div className="card stretch stretch-full">
                <div className="card-body">
                    <div className="hstack justify-content-between mb-4 pb-">
                        <div>
                            <h5 className="mb-1">Projects</h5>
                            <span className="fs-12 text-muted">Recent project progress</span>
                        </div>
                        <Link to="#" className="btn btn-light-brand">View Alls</Link>
                    </div>
                    <div className="row g-4">
                        {projectData.map(({ deadiline, progress, progress_color, project_name }, index) => (
                            <div key={index} className="col-xxl-3 col-md-6">
                                <div className="card-body border border-dashed border-gray-5 rounded-3 position-relative">
                                    <div className="hstack justify-content-between gap-4">
                                        <div>
                                            <h6 className="fs-14 text-truncate-1-line">{project_name}</h6>
                                            <div className="fs-12 text-muted"><span className="text-dark fw-medium">Deadiline:</span> {deadiline}</div>
                                        </div>
                                        <div className="project-progress-1">
                                            <CircleProgress value={progress} text_sym={"%"} path_width='8px' path_color={progress_color} />
                                        </div>
                                    </div>
                                    <div className="badge bg-gray-200 text-dark project-mini-card-badge">Updates</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDateLineMiscellaneous

