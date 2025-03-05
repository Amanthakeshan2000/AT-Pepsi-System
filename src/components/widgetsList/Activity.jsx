import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardLoader from '@/components/shared/CardLoader';
import { profileActivityData2 } from '@/utils/fackData/profileActivityData';
import ImageGroup from '@/components/shared/ImageGroup';

const Activity = ({ title }) => {

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action">
                    <ul className="list-unstyled mb-0 activity-feed-1">
                        {profileActivityData2.map(({ badges, color, description, timeAgo, title }, index) => (
                            <li key={index} className={`feed-item feed-item-${color}`}>
                                <div className="d-flex gap-4 justify-content-between">
                                    <div>
                                        <div className="mb-2 text-truncate-1-line"><a href="#" className="fw-semibold text-dark">{title}</a></div>
                                        <p className="fs-12 text-muted mb-3 text-truncate-2-line">{description}</p>
                                        <div>
                                            {badges.map((badge, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        {badge.users ?
                                                            <div className="img-group lh-0 ms-2 justify-content-start">
                                                                <ImageGroup data={badge.users} />
                                                                <span className="fs-11 text-muted ms-3 text-truncate-1-line">6.78K+ members connections</span>
                                                            </div>
                                                            :
                                                            <a href="#" className={`badge border border-dashed border-gray-500 text-${badge.color}`}>{badge.text}</a>

                                                        }
                                                    </Fragment>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="fs-10 fw-medium text-uppercase text-muted text-nowrap">{timeAgo}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>

    )
}

export default Activity

