import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardLoader from '@/components/shared/CardLoader';
import getIcon from '@/utils/getIcon';
import { FaStar } from 'react-icons/fa6';

const clientData = [
    { color: "primary", name: "Bongcaras Owen", clientId: "963258", rating: 5, date: "Dec 17, 2023" },
    { color: "warning", name: "Stanley C. Owens", clientId: "251362", rating: 5, date: "Dec 17, 2023" },
    { color: "info", name: "Stanley Owens", clientId: "589647", rating: 5, date: "Dec 17, 2023" },
    { color: "danger", name: "Effery M. Jensen", clientId: "789654", rating: 5, date: "Dec 17, 2023" },
    { color: "teal", name: "Adam L. Easter", clientId: "357951", rating: 5, date: "Dec 17, 2023" },
    { color: "success", name: "Owens Stanley", clientId: "589647", rating: 5, date: "Dec 17, 2023" },
];

const Feedback = ({ title }) => {

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
                        clientData.map(({ name, clientId, rating, date, color }, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="pd-x-30 pd-y-15 d-flex justify-content-between">
                                        <div className="d-flex">
                                            <div className={`avatar-text avatar-lg rounded bg-soft-${color} text-${color} border-soft-${color}`}>{name.substring(0, 1)}</div>
                                            <div className="ps-3">
                                                <a href="#" className="d-block">{name}</a>
                                                <span className="fs-12 text-muted">Clients ID: #{clientId}</span>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <div className='d-flex gap-1 mb-1'>
                                                {Array.from({ length: rating }).map((_, i) => (
                                                    <i key={i} className="text-warning fs-11"><FaStar/></i>
                                                ))}
                                            </div>
                                            <span className="fs-10 fw-semibold text-uppercase text-muted">{date}</span>
                                        </div>
                                    </div>
                                    {clientData.length - 1 === index ? "" : <hr className="border-dashed my-3" />}
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

export default Feedback

