import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardLoader from '@/components/shared/CardLoader';
import { profileActivityData, profileActivityData2 } from '@/utils/fackData/profileActivityData';
import ImageGroup from '@/components/shared/ImageGroup';
import { FiCheck, FiEye, FiMoreVertical } from 'react-icons/fi';

const ActivityTwo = ({ title }) => {

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action pb-3">
                    <ul className="list-unstyled activity-feed mb-0">

                        {profileActivityData.slice(0, 7).map((item, index) => (
                            <ActivityListItem
                                key={index}
                                type={item.type}
                                leadDate={item.leadDate}
                                date={item.date}
                                text={item.text}
                                linkText={item.linkText}
                                linkHref={item.linkHref}
                                badge={item.badge}
                                badgeColor={item.badgeColor}
                            />
                        ))}

                    </ul>
                </div>
                <a href="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Refresh</a>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>

    )
}

export default ActivityTwo

export const ActivityListItem = ({ badge, badgeColor, type, leadDate, date, text, linkText, linkHref }) => {
    return (
        <li className={`d-flex justify-content-between feed-item feed-item-${type}`}>
            <div>
                <span className="text-truncate-1-line lead_date">
                    {leadDate} <span className="date">{date}</span>
                </span>
                <span className="text">
                    {text}
                    {
                        badge ?
                            <a href={linkHref} className={`badge bg-soft-${badgeColor} text-${badgeColor} ms-1`}> {linkText}</a>
                            :
                            <a href={linkHref} className="fw-bold text-primary"> {linkText}</a>
                    }
                </span>
            </div>
            <div className="ms-3 d-flex gap-2 align-items-center">
                <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><FiCheck size={12} strokeWidth={1.6} /></a>
                <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><FiEye size={12} strokeWidth={1.6} /></a>
                <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><FiMoreVertical /></a>
            </div>
        </li>
    )
}