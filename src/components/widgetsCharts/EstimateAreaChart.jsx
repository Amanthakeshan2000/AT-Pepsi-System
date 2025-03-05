import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { estimateAreaChartOptions } from '@/utils/chartsLogic/estimateAreaChartOptions';

const cardData = [
    { color: 'primary', percentage: '12%', value: '3,569', title: 'Total Sales', chartColor: "#93a9ff" },
    { color: 'danger', percentage: '15%', value: '1,254', title: 'Total Comment', chartColor: '#ff9999' },
    { color: 'success', percentage: '20%', value: '$9.657', title: 'Income Status', chartColor: '#64ffaa' },
    { color: 'warning', percentage: '23%', value: '3,967', title: 'Total Visitors', chartColor: '#ffca7d' }
];
const EstimateAreaChart = () => {
    const chartOption = estimateAreaChartOptions()
    const data = [20, 10, 18, 12, 25, 10, 20]
    return (
        <>
            {cardData.map(({ chartColor, color, title, percentage, value }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className={`card bg-${color} text-white`}>
                        <div className="card-body">
                            <span className="badge bg-soft-primary text-dark float-end">{percentage}</span>
                            <div className="text-start">
                                <h4 className="text-reset">{value}</h4>
                                <p className="text-reset m-0">{title}</p>
                            </div>
                        </div>

                        <ReactApexChart
                            options={{ ...chartOption, colors: [chartColor] }}
                            series={[{ name: title, data }]}
                            type='area'
                            height={100}
                        />

                    </div>
                </div>
            ))}
        </>
    )
}

export default EstimateAreaChart