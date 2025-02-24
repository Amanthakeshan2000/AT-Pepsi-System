import React from 'react'
import CircleProgress from '@/components/shared/CircleProgress';

const ProposalHeaderContent = () => {
    return (
        <div id="collapseOne" className="accordion-collapse collapse page-header-collapse proposal-header">
            <div className="accordion-body pb-2">
                <div className="row">
                    <Card title="Paid" value="78/100" progressClass="progress-1" price={450} strokeColor="#3454d1" />
                    <Card title="Pending" value="45/100" progressClass="progress-2" price={550} strokeColor="#17c666" />
                    <Card title="Overdue" value="12/100" progressClass="progress-3" price={850} strokeColor="#ffa21d" />
                    <Card title="Draft" value="3/10" progressClass="progress-4" price={900} strokeColor="#ea4d4d" />
                </div>
            </div>
        </div>
    )
}

export default ProposalHeaderContent


const Card = ({ title, value, progressClass, strokeColor, price }) => {
    return (
        <div className="col-xxl-3 col-md-6">
            <div className="card stretch stretch-full">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <a href="#" className="fw-bold d-block">
                            <span className="d-block">{title}</span>
                            <span className="fs-20 fw-bold d-block">{value}</span>
                        </a>
                        <div className={`${progressClass}`}>
                            <CircleProgress text_first_sym='$' value={price} text_sym={"USD"} path_color={strokeColor} path_width='6' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

