import React from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import { FiArrowRight, FiClock, FiMessageSquare } from 'react-icons/fi';
import CardLoader from '@/components/shared/CardLoader';

const meetings = [
    { color: 'primary', title: 'Meeting with new clients.', time: '12:30 AM' },
    { color: 'success', title: 'Meeting with new clients.', time: '12:30 AM' },
    { color: 'danger', title: 'Meeting with new clients.', time: '12:30 AM' },
    { color: 'warning', title: 'Meeting with new clients.', time: '12:30 AM' },
    { color: 'dark', title: 'Meeting with new clients.', time: '12:30 AM' },
    { color: 'danger', title: 'Meeting with new clients.', time: '12:30 AM' },
];

const Meeting = ({ title }) => {

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action">
                    {meetings.map((meeting, index) => (
                        <div key={index}>
                            <MeetingItem color={meeting.color} title={meeting.title} time={meeting.time} />
                            {meetings.length - 1 === index ? "" : <hr className="border-dashed my-3" />}
                        </div>
                    ))}
                </div>
                <a href="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Update: 20 Min Ago</a>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>

    )
}

export default Meeting

const MeetingItem = ({ color, title, time }) => {
    return (
        <div className={`hstack gap-3 justify-content-between`}>
            <div className="hstack gap-3">
                <div className={`wd-7 ht-7 bg-${color} rounded-circle`} />
                <div className={`ps-3 border-start border-3 border-${color} rounded`}>
                    <a href="#" className="fw-semibold mb-1 text-truncate-1-line">{title}</a>
                    <a href="#" className="fs-12 text-muted">
                        <i className="lh-1 fs-10 me-1"><FiMessageSquare /></i>
                        <span className="fw-normal">Google Meet</span>
                    </a>
                </div>
            </div>
            <div className="hstack gap-2">
                <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title={time}><FiClock /></div>
                <a href="#" className="avatar-text avatar-md"><FiArrowRight /></a>
            </div>
        </div>
    );
};
