import React, { Fragment } from 'react'
import ReactApexChart from 'react-apexcharts'
import { estimateAreaChartOptions } from '@/utils/chartsLogic/estimateAreaChartOptions'
import getIcon from '@/utils/getIcon';

const salesData = [
    { title: 'Weekly Bestseller', names: 'Mark, Rowling, Esther', amount: '$99,685', sales: 698, icon: "feather-airplay", color: "primary" },
    { title: 'Feature Sellers', names: 'Randy, Steve, Mike', amount: '$95,685', sales: 457, icon: "feather-award", color: "success" },
    { title: 'Popular Authors', names: 'John, Pat, Jimmy', amount: '$90,759', sales: 447, icon: "feather-user-check", color: "danger" }
];

const StatusMiscellaneous = () => {
    const chartOption = estimateAreaChartOptions()
    const data = [10, 20, 18, 25, 12, 10, 20]
    return (
        <div className="col-xxl-4">
            <div className="card stretch stretch-full overflow-hidden">
                <div className="bg-success text-white">
                    <div className="p-4">
                        <span className="badge bg-light text-primary text-dark float-end">12%</span>
                        <div className="text-start">
                            <h4 className="text-reset">9.657</h4>
                            <p className="text-reset m-0">Income Status</p>
                        </div>
                    </div>
                    <ReactApexChart
                        options={{ ...chartOption, colors: ["#64ffaa"] }}
                        series={[{ name: "Income Status", data }]}
                        type='area'
                        height={150}
                    />
                </div>
                <div className="card-body">
                    {salesData.map(({ title, names, amount, sales, icon, color }, index) => (
                        <Fragment key={index}>
                            {index !== 0 && <hr className="border-dashed my-3" />}
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div className={`avatar-text avatar-lg bg-soft-${color} text-${color} border-soft-${color} rounded me-3`}>
                                        <i className='fs-16'>{getIcon(icon)}</i>
                                    </div>
                                    <div>
                                        <a href="#">{title}</a>
                                        <p className="fs-12 text-muted mb-0">{names}</p>
                                    </div>
                                </div>
                                <div className="mt-2 mt-md-0 text-md-end mg-l-60 ms-md-0">
                                    <a href="#" className="fw-bold d-block">{amount}</a>
                                    <span className="fs-12 text-muted">{sales} Sales</span>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default StatusMiscellaneous