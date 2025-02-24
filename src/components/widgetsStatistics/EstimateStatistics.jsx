import React from 'react'
import getIcon from '@/utils/getIcon';
import { FiFigma } from 'react-icons/fi';

const statisticsData = [
    { amount: '$84,059', description: 'Sales', icon: 'feather-shopping-cart', bgColor: 'bg-primary' },
    { amount: '$23,485', description: 'Earnings', icon: 'feather-dollar-sign', bgColor: 'bg-success' },
    { amount: '2,364', description: 'Total Sales', icon: 'feather-tag', bgColor: 'bg-warning' },
    { amount: '$96,485', description: 'Revenue', icon: 'feather-bar-chart-2', bgColor: 'bg-teal' }
];

const EstimateStatistics = () => {
    return (
        <>

            {statisticsData.map(({ amount, description, icon, bgColor }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className="card card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="me-3">
                                <h5 className="fs-4">{amount}</h5>
                                <span className="text-muted">{description}</span>
                            </div>
                            <div className={`avatar-text avatar-lg ${bgColor} text-white rounded`}>
                                <i>{React.cloneElement(getIcon(icon), {size:"16", strokeWidth:"2.4"})}</i>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default EstimateStatistics