import React from 'react'
import Dropdown from '@/components/shared/Dropdown';
import { FiChevronDown, FiChevronUp, FiMoreHorizontal } from 'react-icons/fi';

const data = [
    { title: 'Total Earnings', amount: '$485,328', percentage: '25.7%', color: 'primary', extraEarnings: '$1,827', trend: "up" },
    { title: 'Total Sale', amount: '$32,585', percentage: '20.9%', color: 'danger', extraEarnings: '$1,827', trend: "down" },
    { title: 'Total Profit', amount: '$674,245', percentage: '34.2%', color: 'warning', extraEarnings: '$64,827', trend: "up" },
    { title: 'Total Order', amount: '$568,963', percentage: '26.8%', color: 'teal', extraEarnings: '$6,827', trend: "down" }
];

const options = [
    { label: "Daily" },
    { label: "Weekly" },
    { label: "Monthly" },
    { label: "Yearly" },
]

const EstimateStatisticsThree = () => {
    return (
        <>
            {data.map(({ title, amount, percentage, color, extraEarnings, trend }, index) => (
                <div key={index} className="col-xxl-3 col-sm-6 cdx-xxl-50">
                    <div className="card card-body">
                        <div className="hstack justify-content-between">
                            <div className="fw-bold text-dark">{title}</div>
                            <Dropdown
                                dropdownItems={options}
                                dropdownParentStyle={"open"}
                                triggerIcon={<FiMoreHorizontal size={16} />}
                                isAvatar={false}

                            />
                        </div>
                        <div className="mt-5">
                            <div className="hstack justify-content-between">
                                <div className="fs-4 fw-bold text-dark">{amount}</div>
                                <div className={`badge bg-soft-${color} text-${color}`}>
                                    <span>{percentage}</span>
                                    {
                                        trend === "up" ? <FiChevronUp size={12}/> : <FiChevronDown size={12}/>
                                    }
                                </div>
                            </div>
                            <div className="progress ht-5 my-2">
                                <div className={`progress-bar bg-${color}`} role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100} style={{ width: '78%' }} />
                            </div>
                            <div className="fs-12 text-muted">This week extra earnings in <span className="fw-bold text-dark">{extraEarnings}</span></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default EstimateStatisticsThree