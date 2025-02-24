import React from 'react'
import { Link } from 'react-router-dom'
import CardHeader from '@/components/shared/CardHeader'
import { upcomingScheduleList } from '@/utils/fackData/upcomingScheduleList'
import ImageGroup from '@/components/shared/ImageGroup'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'

const Schedule = ({ title }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body">
                    {
                        upcomingScheduleList.map(({ date, id, schedule_name, team_members, color }) => {
                            return (
                                <div key={id} className="p-3 border border-dashed rounded-3 schedule-card">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className={`wd-50 ht-50 lh-1 d-flex align-items-center justify-content-center flex-column rounded-2 bg-soft-${color} text-${color} schedule-date`}>
                                                <span className="fs-18 fw-bold mb-1 d-block">{date.day}</span>
                                                <span className="fs-10 fw-semibold text-uppercase d-block">{date.month}</span>
                                            </div>
                                            <div className="text-dark">
                                                <Link to="#" className="fw-bold mb-2 text-truncate-1-line">{schedule_name}</Link>
                                                <span className="fs-11 fw-normal text-muted text-truncate-1-line">{date.time}</span>
                                            </div>
                                        </div>
                                        <div className="img-group lh-0 ms-3 justify-content-start d-none d-sm-flex">
                                            <ImageGroup data={team_members} avatarSize='avatar-md' />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center py-4">Upcomming Schedule</Link>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default Schedule
