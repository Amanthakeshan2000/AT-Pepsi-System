import React from 'react'
import getIcon from '@/utils/getIcon';

const statisticsData = [
    { icon: 'feather-users', number: '8,475', title: 'New Customers', color: 'primary' },
    { icon: 'feather-user-plus', number: '4,586', title: 'New Clients', color: 'success' },
    { icon: 'feather-shopping-cart', number: '2,245', title: 'Total Products', color: 'warning' },
    { icon: 'feather-dollar-sign', number: '$26.45K', title: 'Total Revenue', color: 'danger' }
];


const UserOverviewStatisticsThree = () => {
    return (
        <>
            {statisticsData.map(({ icon, number, title, color }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className={`card bg-${color} border-${color} text-white overflow-hidden`}>
                        <div className="card-body">
                            <i className={`fs-20`}>{getIcon(icon)}</i>
                            <h5 className="fs-4 text-reset mt-4 mb-1">{number}</h5>
                            <div className="fs-12 text-reset fw-normal">{title}</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default UserOverviewStatisticsThree