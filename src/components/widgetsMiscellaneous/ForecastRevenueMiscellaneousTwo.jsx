import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import { Link } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'

const ForecasRevenuetMiscellaneousTwo = () => {
    const percent = 63
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return
    }
    return (
        <div className="col-xxl-4">
            {isRemoved ? "" :
                <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                    <CardHeader title={"Revenue Forecast"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                    <div className="card-body custom-card-action">
                        <div className="text-center mb-4 d-flex justify-content-center">
                            <div className="revenue-progress revenue-progress-2">
                                <CircularProgressbar
                                    value={percent}
                                    text={`${percent}%`}
                                    background
                                    styles={{
                                        path: {
                                            transition: "stroke-dashoffset 0.5s ease"
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <hr className="border-top-dashed" />
                            <Card img={"/images/icons/1.png"} description={"Ricky Hunt, Sandra Trepp"} revenue={"85K"} title={"Monthly Subscription"} />
                            <hr className="border-top-dashed" />
                            <Card img={"/images/icons/2.png"} description={"Ricky Hunt, Sandra Trepp"} revenue={"96K"} title={"Monthly Contributors"} />
                        </div>

                        <CardLoader refreshKey={refreshKey} />
                    </div>
                    <div className="card-footer">
                        <Link to="#" className="btn btn-primary">Generate Report</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default ForecasRevenuetMiscellaneousTwo

const Card = ({ img, title, description, revenue }) => {
    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-3">
                <div className="avatar-text">
                    <img src={img} alt="img" className="img-fluid" />
                </div>
                <div>
                    <a href="#" className="fw-bold">{title}</a>
                    <div className="fs-11 text-muted mt-1">{description}</div>
                </div>
            </div>
            <div>
                <div className="badge bg-soft-100 text-dark">+ {revenue}</div>
            </div>
        </div>
    )
}
