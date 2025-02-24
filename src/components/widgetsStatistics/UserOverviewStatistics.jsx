import React from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const statisticsData = [
    { title: 'Employees', amount: '$3,238', percentage: '22.6%', trend: 'down', progressBarColor: 'danger', progressBarWidth: '63%' },
    { title: 'Expenses', amount: '$3,238', percentage: '25.7%', trend: 'up', progressBarColor: 'success', progressBarWidth: '63%' },
    { title: 'New Users', amount: '2,367', percentage: '20.8%', trend: 'down', progressBarColor: 'danger', progressBarWidth: '50%' },
    { title: 'New Clients', amount: '2,367', percentage: '20.2%', trend: 'down', progressBarColor: 'success', progressBarWidth: '79%' },
];

const UserOverviewStatistics = () => {
    return (
        <>

            {statisticsData.map(({ title, amount, percentage, trend, progressBarColor, progressBarWidth }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className="card card-body">
                        <div className="fs-12 text-muted">{title}</div>
                        <div className="hstack justify-content-between mt-4">
                            <div className="text-dark fw-bold">{amount}</div>
                            <span className={`badge bg-soft-${trend === 'up' ? 'success' : 'danger'} text-${trend === 'up' ? 'success' : 'danger'}`}>
                                <span className="me-1">{percentage}</span>
                                {trend === 'up' && <i><FiChevronUp /></i>}
                                {trend === 'down' && <i><FiChevronDown /></i>}
                            </span>
                        </div>
                        <div className="progress mt-2 ht-3">
                            <div className={`progress-bar bg-${progressBarColor}`} role="progressbar" style={{ width: progressBarWidth }} />
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}

export default UserOverviewStatistics