import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import { Link } from 'react-router-dom'
import { upcomingEventsData } from '@/utils/fackData/upcomingEventsData'
import ImageGroup from '@/components/shared/ImageGroup'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'

const ScheduleTwo = ({ title, data }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action p-0">
                    <ul className="list-group list-group-flush upcoming-event-report-lead">
                        {data.map(({ date, id, schedule_name, team_members }) => (
                            <li key={id} className="list-group-item">
                                <div className="d-sm-flex justify-content-between">
                                    <div className="hstack gap-3">
                                        <div className="ht-60 wd-60 border bg-gray-200 rounded-3 d-flex flex-column justify-content-center text-center">
                                            <span className="fs-18 fw-bolder text-dark">{date.day}</span>
                                            <span className="fs-10 text-uppercase">{date.month}</span>
                                        </div>
                                        <div className="me-4">
                                            <p className="fs-12 fw-medium text-muted mb-2">{date.time}</p>
                                            <Link to="#" className="fw-bold text-truncate-1-line">{schedule_name}</Link>
                                        </div>
                                    </div>
                                    <div className="img-group lh-0 ms-2 justify-content-start d-none d-sm-flex">
                                        <ImageGroup data={team_members} avatarSize='avatar-md' avatarMore={"35+"} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Update: 20 Min Ago</Link>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default ScheduleTwo