import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import { FiArrowRight, FiClock, FiMessageSquare } from 'react-icons/fi';
import CardLoader from '@/components/shared/CardLoader';

const todos = [
    { time: '06:47', title: 'Create a new project for client', dueIn: 3, badgeColor: 'primary', badgeText: 'New' },
    { time: '02:50', title: 'Add files to new design folder', dueIn: 5, badgeColor: 'success', badgeText: 'New' },
    { time: '03:48', title: 'Shared 2 New Project Files', dueIn: 5, badgeColor: 'dark', badgeText: 'New' },
    { time: '04:35', title: 'Project status updated', dueIn: 4, badgeColor: 'danger', badgeText: 'New' },
    { time: '05:46', title: 'Project meeting with john', dueIn: 3, badgeColor: 'success', badgeText: 'New' },
    { time: '06:47', title: 'Create Duralux CRM Logo', dueIn: 2, badgeColor: 'warning', badgeText: 'New' },
];

const Todos = ({ title }) => {

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action">
                    {
                        todos.map(({ badgeColor, badgeText, dueIn, time, title }, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="d-flex align-items-center">
                                        <div className="me-4">
                                            <h2 className="fs-16 fw-bold mb-0">{time}</h2>
                                        </div>
                                        <div className={`d-flex align-items-center justify-content-between border-3 border-start border-${badgeColor} rounded w-100`}>
                                            <div className="mx-3">
                                                <a href="#" className="fw-semibold mb-1 text-truncate-1-line">{title}</a>
                                                <div className="fs-12 fw-normal text-muted text-truncate-1-line">Due in {dueIn} days</div>
                                            </div>
                                            <a href="#" className={`badge bg-soft-${badgeColor} text-${badgeColor}`}>{badgeText}</a>
                                        </div>
                                    </div>
                                    {todos.length - 1 === index ? "" : <hr className="border-dashed my-3" />}
                                </Fragment>
                            )
                        })
                    }
                </div>
                <a href="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Refresh</a>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>

    )
}

export default Todos

