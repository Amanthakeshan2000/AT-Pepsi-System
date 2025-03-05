import React from 'react';
import { Link } from 'react-router-dom';
import { reportSalesStatisticsData } from '@/utils/fackData/reportSalesStatisticsData';
import getIcon from '@/utils/getIcon';


const EstimateStatisticsTwo = () => {
    return (
        <>
            {
                reportSalesStatisticsData.map(({ id, last_month_sales, revenue, running_month_sales, title, icon }) => {
                    const parseSales = (sales) => {
                        if (typeof sales === 'string') {
                            const parsed = parseInt(sales.replace(/,/g, ''), 10);
                            return isNaN(parsed) ? 0 : parsed;
                        }
                        return sales || 0;
                    };

                    const last = parseSales(last_month_sales);
                    const running = parseSales(running_month_sales);

                    const isRunningGreater = running > last;
                    const badgeClass = isRunningGreater ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger';
                    const symbol = isRunningGreater ? '+' : '-';

                    return (
                        <div key={id} className="col-xxl-3 col-md-6">
                            <div className="card stretch stretch-full">
                                <div className="card-body">
                                    <div className="hstack justify-content-between">
                                        <div>
                                            <div className="hstack gap-2 mb-4">
                                                {React.cloneElement(getIcon(icon), { size: "16" })}
                                                <span>{title}</span>
                                            </div>
                                            <h4 className="fw-bolder mb-3">$<span className="counter">{running_month_sales}</span> USD</h4>
                                            <p className="fs-12 text-muted mb-0">vs last month: <span className="fw-semibold text-dark">${last_month_sales} USD</span></p>
                                        </div>

                                        <Link to="#" className={`badge ${badgeClass}`}>{symbol} {revenue}%</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }
        </>
    );
};

export default EstimateStatisticsTwo;
