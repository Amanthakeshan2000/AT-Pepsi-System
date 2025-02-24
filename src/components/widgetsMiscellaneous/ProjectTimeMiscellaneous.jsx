import React, { Fragment } from 'react'
import CircleProgress from '@/components/shared/CircleProgress';
import { projectsData } from '@/utils/fackData/projectsData';

const ProjectTimeMiscellaneous = () => {
    const data = projectsData.timeSheetsProjects
    return (
        <>
            {
                data.map(({ progress, projectsList, progressColor, footerLabelLeft, footerLabelRight }, index) => (
                    <TaskCard
                        key={index}
                        progress={progress}
                        projectsList={projectsList}
                        progressColor={progressColor}
                        footerLabelLeft={footerLabelLeft}
                        footerLabelRight={footerLabelRight}
                    />
                ))
            }

        </>
    )
}

export default ProjectTimeMiscellaneous


const TaskCard = ({ progress, projectsList, footerLabelRight, progressColor, footerLabelLeft }) => {
    return (
        <div className="col-xxl-4">
            <div className="card stretch stretch-full">
                <div className="card-header justify-content-center">
                    <div className="times-progress-chart">
                        <CircleProgress value={progress} text_sym={"%"} path_color={progressColor} path_width='6' />
                    </div>
                </div>
                <div className="card-body">
                    {
                        projectsList.map(({ taskName, completedTasks, totalTasks, bgColor, borderColor, time }, index) =>
                            <Fragment key={taskName}>
                                <div className="hstack gap-3 justify-content-between">
                                    <div className="hstack gap-3">
                                        <div className={`wd-7 ht-7 ${bgColor} rounded-circle`}></div>
                                        <div className={`ps-3 border-start border-3 ${borderColor} rounded`}>
                                            <a href="#" className="fw-bold text-truncate-1-line">{taskName}</a>
                                            <a href="#" className="fs-12 fw-medium text-muted">{completedTasks}/{totalTasks} Tasks</a>
                                        </div>
                                    </div>
                                    <a href="#" className="fw-bold">{time}</a>
                                </div>
                                {index !== projectsList.length - 1 && <hr className="border-dashed my-3" />}
                            </Fragment>
                        )
                    }
                </div>

                <div className="card-footer hstack justify-content-around">
                    <div className="text-center">
                        <a href="#" className="fs-16 fw-bold">{footerLabelLeft.title}</a>
                        <div className="fs-11 text-muted">{footerLabelLeft.description}</div>
                    </div>
                    <span className="vr"></span>
                    <div className="text-center">
                        <a href="#" className="fs-16 fw-bold">{footerLabelRight.title}</a>
                        <div className="fs-11 text-muted">{footerLabelRight.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

