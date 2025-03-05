import React from 'react'
import getIcon from '@/utils/getIcon';

const statisticsData = [
    { color: 'primary', icon: 'feather-log-in', title: 'Logged Hours', value: '00:00' },
    { color: 'warning', icon: 'feather-clipboard', title: 'Billable Hours', value: '00:00' },
    { color: 'success', icon: 'feather-check', title: 'Billed Hours', value: '00:00' },
    { color: 'danger', icon: 'feather-x', title: 'Unbilled Hour', value: '00:00' },
];

const TimeStatisticsTwo = () => {
    return (
        <>
            {statisticsData.map(({ color, icon, title, value }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className="card stretch stretch-full">
                        <div className="card-body">
                            <div className={`avatar-text bg-soft-${color} text-${color} border-0 mb-3`}>
                                <i className={"fs-16"} >{getIcon(icon)}</i>
                            </div>
                            <p><span className={`fw-bold text-${color}`}>{title}:</span> {value}</p>
                            <div><span className="fw-bold text-dark">Total Billed:</span> 00:00</div>
                        </div>
                    </div>
                </div>
            ))}
        </>

    )
}

export default TimeStatisticsTwo