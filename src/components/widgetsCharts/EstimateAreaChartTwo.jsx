import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { earningsExpensesChartOption } from '@/utils/chartsLogic/earningsExpensesChartOption'

const financialData = [
    { title: 'Earnings', amount: '(+) $55,236 USD', percentage: '69%', chartColor: "#25b865", color: "success" },
    { title: 'Expenses', amount: '(-) $16,845 USD', percentage: '47%', chartColor: "#d13b4c", color: "danger" },
    { title: 'Revenue', amount: '(+) $96,753 USD', percentage: '74%', chartColor: "#3454D1", color: "primary" }
];

const EstimateAreaChartTwo = () => {

    const data = [25, 60, 20, 90, 45, 100, 55]
    const chartOption = earningsExpensesChartOption()
    return (
        <>
            {financialData.map(({ amount, percentage, title, chartColor, color }, index) => (
                <div key={index} className="col-lg-4">
                    <div className="card stretch stretch-full">
                        <div className="card-body p-0">
                            <div className="p-4 d-flex align-items-start justify-content-between">
                                <div>
                                    <div className={`fs-12 fw-semibold mb-2 text-${color}`}>{title}</div>
                                    <h4 className={`mb-2 text-${color}`}>{amount} USD</h4>
                                    <div className="fs-12 text-muted text-truncate-1-line">Earnings is {percentage} more than last month.</div>
                                </div>
                                <YearDropdown />
                            </div>
                            <div className='pb-3'>
                                <ReactApexChart
                                    type='area'
                                    options={{ ...chartOption, colors: [chartColor] }}
                                    series={[{ name: title, data }]}
                                    height={110}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default EstimateAreaChartTwo

export const YearDropdown = () => {
    return (
        <div className="filter-dropdown">
            <a href="#" className="btn btn-sm btn-light-brand dropdown-toggle" data-bs-toggle="dropdown">2023</a>
            <div className="dropdown-menu dropdown-menu-end">
                <a href="#" className="dropdown-item active">2023</a>
                <a href="#" className="dropdown-item">2022</a>
                <a href="#" className="dropdown-item">2021</a>
                <a href="#" className="dropdown-item">2020</a>
                <a href="#" className="dropdown-item">2019</a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">All Times</a>
            </div>
        </div>
    )
}