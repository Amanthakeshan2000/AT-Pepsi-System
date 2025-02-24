import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import CardHeader from '@/components/shared/CardHeader'
import { projectsData } from '@/utils/fackData/projectsData'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'

const Project = ({ cardYSpaceClass, borderShow, title }) => {
    const data = projectsData.runningProjects;

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action project-status">
                    <div className="mb-3">
                        {data.map(({ id, progress, project_category, project_logo, project_name, progress_color }, index) => (
                            <Fragment key={id}>
                                {borderShow ? <hr className="border-dashed my-3" /> : ""}
                                <div className={`d-flex ${index === data.length - 1 ? "mb-0" : cardYSpaceClass}`}>
                                    <div className="d-flex w-50 align-items-center me-3">
                                        <img src={project_logo} alt="sketch-logo" className="me-3" width="35" />
                                        <div>
                                            <a href="E" className="text-truncate-1-line">{project_name}</a>
                                            <div className="fs-11 text-muted">{project_category}</div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-grow-1 align-items-center">
                                        <div className="progress w-100 me-3 ht-5">
                                            <div className={`progress-bar ${progress_color}`} role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="29" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <span className="text-muted">{progress}%</span>
                                    </div>
                                </div>
                            </Fragment>
                        )

                        )}
                    </div>
                </div>
                <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Upcomming Projects</Link>
            </div>
            <CardLoader refreshKey={refreshKey} />
        </div>
    )
}

export default Project
