import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { YearDropdown } from '../widgetsCharts/EstimateAreaChartTwo'
import { earningsExpensesChartOption } from '@/utils/chartsLogic/earningsExpensesChartOption'

const financialData = [
    { title: 'Earnings', amount: '(+) $55,236 USD', percentage: '69%', chartColor: "#25b865", color: "success" },
    { title: 'Expenses', amount: '(-) $16,845 USD', percentage: '47%', chartColor: "#d13b4c", color: "danger" },
    { title: 'Revenue', amount: '(+) $96,753 USD', percentage: '74%', chartColor: "#3454D1", color: "primary" }
];

const EstimateMiscellaneous = () => {

    const data = [25, 60, 20, 90, 45, 100, 55]
    const chartOption = earningsExpensesChartOption()
    return (
        <>
            {
                financialData.map(({ amount, color, percentage, title, chartColor }, index) => (
                    <div key={index} className="col-xxl-4">
                        <div className="card stretch stretch-full">
                            <div className="p-4 d-flex align-items-start justify-content-between">
                                <div>
                                    <div className={`fs-12 text-${color} fw-semibold mb-2`}>{title}</div>
                                    <h4 className={`text-${color} mb-2`}>{amount}</h4>
                                    <div className="fs-12 text-muted text-truncate-1-line">Earnings is {percentage} more than last month.</div>
                                </div>
                                <YearDropdown />
                            </div>
                            <div className='pb-2'>
                                <ReactApexChart
                                    type='area'
                                    options={{ ...chartOption, colors: [chartColor] }}
                                    series={[{ name: title, data }]}
                                    height={110}
                                />
                            </div>
                            <CardBody color={color} />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default EstimateMiscellaneous

const CardBody = ({ color }) => {
    return (
        <div className={`card-body bg-soft-${color}`}>
            <div className="row g-4">
                <div className="col-6">
                    <a href="#" className="d-block p-4 text-center rounded border border-dashed">
                        <div className="fs-12 text-muted">Avarage Sale</div>
                        <div className="fs-5 fw-bold text-dark">$850</div>
                    </a>
                </div>
                <div className="col-6">
                    <a href="#" className="d-block p-4 text-center rounded border border-dashed">
                        <div className="fs-12 text-muted">Comissions</div>
                        <div className="fs-5 fw-bold text-dark">$34,500</div>
                    </a>
                </div>
                <div className="col-6">
                    <a href="#" className="d-block p-4 text-center rounded border border-dashed">
                        <div className="fs-12 text-muted">Revenue</div>
                        <div className="fs-5 fw-bold text-dark">$68,000</div>
                    </a>
                </div>
                <div className="col-6">
                    <a href="#" className="d-block p-4 text-center rounded border border-dashed">
                        <div className="fs-12 text-muted">Expenses</div>
                        <div className="fs-5 fw-bold text-dark">$230,600</div>
                    </a>
                </div>
            </div>
        </div>
    )
}