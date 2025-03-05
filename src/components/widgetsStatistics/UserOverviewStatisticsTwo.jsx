import React from 'react'
import getIcon from '@/utils/getIcon';
const data = [
    { color: 'primary', value: '8,475', description: 'New Customers', icon: "feather-users" },
    { color: 'success', value: '4,586', description: 'New Clients', icon: "feather-user-plus" },
    { color: 'warning', value: '2,245', description: 'Total Products', icon: "feather-shopping-cart" },
    { color: 'danger', value: '$26.45K', description: 'Total Revenue', icon: "feather-dollar-sign" }
];

const UserOverviewStatisticsTwo = () => {
    return (
        <>
            {data.map(({ color, value, description, icon }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className={`card bg-soft-${color} border-soft-${color} text-${color} overflow-hidden`}>
                        <div className="card-body">
                            <i className={`fs-20`} >{getIcon(icon)}</i>
                            <h5 className="fs-4 text-reset mt-4 mb-1">{value}</h5>
                            <div className="fs-12 text-reset fw-normal">{description}</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default UserOverviewStatisticsTwo