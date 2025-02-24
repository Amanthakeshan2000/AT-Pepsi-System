import React from 'react'
import getIcon from '@/utils/getIcon';

const leadsData = [
    { icon: "feather-users", title: "Total Leads", count: "26,595", percentage: "36.85%", arrowIcon: "feather-arrow-up", color: "primary", trend: "up" },
    { icon: "feather-user-check", title: "Active Leads", count: "2,245", percentage: "24.56%", arrowIcon: "feather-arrow-down", color: "success", trend: "down" },
    { icon: "feather-user-plus", title: "New Leads", count: "1,254", percentage: "33.29%", arrowIcon: "feather-arrow-up", color: "teal", trend: "up" },
    { icon: "feather-user-minus", title: "Inactive Leads", count: "4,586", percentage: "42.47%", arrowIcon: "feather-arrow-down", color: "danger", trend: "down" }
];

const LeadsStatisticsTwo = () => {
    return (
        <>
            {
                leadsData.map(({ arrowIcon, color, count, icon, percentage, title, trend }, index) => (
                    <div key={index} className="col-xxl-3 col-md-6 customer-header-card">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className={`avatar-text avatar-xl rounded text-${color} bg-soft-${color}`}>
                                            {React.cloneElement(getIcon(icon), { size: 17 })}
                                        </div>
                                        <a href="#" className="fw-bold d-block">
                                            <span className="text-truncate-1-line">{title}</span>
                                            <span className="fs-24 fw-bolder d-block">{count}</span>
                                        </a>
                                    </div>
                                    <div className={`badge ${trend === "up" ? "bg-soft-success text-success" : "bg-soft-danger text-danger"}`}>
                                        {React.cloneElement(getIcon(arrowIcon), { size: 10, className: "me-1" })}
                                        <span>{percentage}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default LeadsStatisticsTwo