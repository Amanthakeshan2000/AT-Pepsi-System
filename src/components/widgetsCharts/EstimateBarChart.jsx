import React from 'react'
import ReactApexChart from 'react-apexcharts';
import getIcon from '@/utils/getIcon';
import { estimateBarChartOptions } from '@/utils/chartsLogic/estimateBarChartOptions';

const chartData = [
    { color: 'primary', icon: 'feather-airplay', title: 'Income Status', amount: '$56.45K', chartColor: "#3454D1" },
    { color: 'danger', icon: 'feather-shopping-cart', title: 'Expenses Status', amount: '$22.75K', chartColor: "#D13B4C" },
    { color: 'success', icon: 'feather-bluetooth', title: 'Total Orders', amount: '$29.73K', chartColor: "#25B865" },
    { color: 'warning', icon: 'feather-briefcase', title: 'Revenue Status', amount: '$99.67K', chartColor: "#E49E3D" },
];


const EstimateBarChart = () => {
    const chartOption = estimateBarChartOptions()
    const data = [40, 55, 45, 58, 47, 61, 49, 65, 54, 69, 57, 73]
    
    return (
        <>
            {chartData.map(({ amount, color, icon, title, chartColor }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className="card stretch stretch-full">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className={`avatar-text avatar-lg bg-soft-${color} text-${color} border-soft-${color} rounded`}>
                                    <i className={"fs-16"}>{getIcon(icon)}</i>
                                </div>
                                <div className="text-end">
                                    <p className="fs-11 fw-medium text-uppercase text-muted mb-1">{title}</p>
                                    <h3 className="tx-20 tx-semibold tx-left">{amount}</h3>
                                </div>
                            </div>
                        </div>
                        <ReactApexChart
                            type='bar'
                            options={{ ...chartOption, colors: [chartColor] }}
                            series={[{ name: title, data }]}
                            height={120}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}

export default EstimateBarChart