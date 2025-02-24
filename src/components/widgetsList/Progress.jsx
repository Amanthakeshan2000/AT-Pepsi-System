import React from 'react'
import { Link } from 'react-router-dom'
import CardHeader from '@/components/shared/CardHeader'
import CircleProgress from '@/components/shared/CircleProgress';
import { teamMembersList } from '@/utils/fackData/teamMembersList'
import CardLoader from '@/components/shared/CardLoader';
import useCardTitleActions from '@/hooks/useCardTitleActions';

const Progress = ({ footerShow, title, btnFooter }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action">
                    {
                        teamMembersList.slice(0, 4).map(({ id, name, position, progress, thumbnail, color }) => {
                            return (
                                <div key={id} className="hstack justify-content-between border border-dashed rounded-3 p-3 team-card chat-single-item">
                                    <div className="hstack gap-3">
                                        {
                                            thumbnail ?
                                                <div className="avatar-image">
                                                    <img src={thumbnail} alt="img" className="img-fluid" />
                                                </div>
                                                :
                                                <div className="text-white avatar-text user-avatar-text">{name.substring(0, 1)}</div>
                                        }
                                        <div>
                                            <Link href="#">{name}</Link>
                                            <div className="fs-11 text-muted">{position}</div>
                                        </div>
                                    </div>
                                    <div className="team-progress">
                                        <CircleProgress value={progress} text_sym={"%"} path_width='6px' path_color={color} />
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
                {
                    footerShow ?
                        <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Update 30 Min Ago</Link>
                        :
                        ""
                }
                {
                    btnFooter && <div className="card-footer">
                        <Link to="#" className="btn btn-primary">Generate Report</Link>
                    </div>
                }
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default Progress
