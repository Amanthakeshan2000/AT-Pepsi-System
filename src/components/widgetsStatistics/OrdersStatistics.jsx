import React from 'react'
import getIcon from '@/utils/getIcon';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

const statisticsData = [
    { value: '290+', description: 'Page Views', changePercentage: '2.9% change', icon: 'feather-eye', trend: "up", color: "success" },
    { value: '$10,254', description: 'Today Earnings', changePercentage: '3.6% change', icon: 'feather-pie-chart', trend: "down", color: "warning" },
    { value: '690+', description: 'Total Sales', changePercentage: '2.3% change', icon: 'feather-shopping-bag', trend: "up", color: "primary" },
    { value: '$25,345', description: 'Orders Received', changePercentage: '4.2% change', icon: 'feather-shopping-cart', trend: "down", color: "danger" }
];


const OrdersStatistics = () => {
    return (
        <>
            {statisticsData.map(({ value, description, changePercentage, icon, trend, color }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className="card stretch stretch-full">
                        <div className="card-body">
                            <div className="hstack justify-content-between">
                                <div>
                                    <h4 className={`text-${color}`}>{value}</h4>
                                    <div className="text-muted">{description}</div>
                                </div>
                                <div className="text-end">
                                    <i className={"fs-2"} >{getIcon(icon)}</i>
                                </div>
                            </div>
                        </div>
                        <div className={`card-footer bg-${color} py-3`}>
                            <div className="hstack justify-content-between">
                                <p className="text-white mb-0">{changePercentage}</p>
                                <div className="text-end">
                                    <i className="text-white fs-16">{trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default OrdersStatistics