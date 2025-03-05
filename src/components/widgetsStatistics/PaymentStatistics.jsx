import React from 'react'
import getIcon from '@/utils/getIcon';
const paymentData = [
    { status: "Paid", total: 100, completed: 78, percentage: 36.85, icon: "feather-arrow-up", color: "success" },
    { status: "Unpaid", total: 50, completed: 38, percentage: 23.45, icon: "feather-arrow-down", color: "danger" },
    { status: "Overdue", total: 30, completed: 15, percentage: 25.44, icon: "feather-arrow-up", color: "success" },
    { status: "Draft", total: 10, completed: 3, percentage: 12.68, icon: "feather-arrow-down", color: "danger" }
];

const PaymentStatistics = () => {
    return (
        <>
            {paymentData.map(({ status, total, completed, percentage, icon, color }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className="card stretch stretch-full">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <a href="#" className="fw-bold d-block">
                                    <span className="d-block">{status}</span>
                                    <span className="fs-20 fw-bold d-block">{completed}/{total}</span>
                                </a>
                                <div className={`badge bg-soft-${color} text-${color}`}>
                                    {React.cloneElement(getIcon(icon), { size: 10, className: "me-1" })}
                                    <span>{percentage}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default PaymentStatistics