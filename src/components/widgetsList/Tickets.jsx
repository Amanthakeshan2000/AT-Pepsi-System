import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardLoader from '@/components/shared/CardLoader';
import Pagination from '@/components/shared/Pagination';

const ticketData = [
    { ticketNumber: '987456', title: 'Meeting with beta testers', date: '20/02/2023', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
    { ticketNumber: '963258', title: 'Live stream for bpl live', date: '20/02/2023', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
    { ticketNumber: '753951', title: 'CEO\'s private party', date: '20/02/2023', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
    { ticketNumber: '456987', title: 'Duralux public announcement', date: '20/02/2023', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
    { ticketNumber: '369852', title: 'Marketing meeting with clients', date: '20/02/2023', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
];

const Tickets = ({ title, paginationShow }) => {

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className="card widget-tickets-content">
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive tickets-items-wrapper">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ticket</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketData.map(({ date, description, ticketNumber, title }, index) => (
                                    <tr key={index}>
                                        <td>
                                            <a href="#">#{ticketNumber}</a>
                                        </td>
                                        <td>
                                            <a href="#">{title} <span className="fs-12 fw-normal text-muted">({date})</span> </a>
                                            <p className="fs-12 text-muted text-truncate-1-line tickets-sort-desc">{description}</p>
                                            <div className="tickets-list-action d-flex align-items-center gap-3">
                                                <a href="#">View</a>
                                                <span>|</span>
                                                <a href="#">View public form</a>
                                                <span>|</span>
                                                <a href="#">Edit</a>
                                                <span>|</span>
                                                <a href="#" className="text-danger">Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {paginationShow &&
                        <div className="card-footer">
                            <Pagination />
                        </div>
                    }
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>

        </div>
    )
}

export default Tickets