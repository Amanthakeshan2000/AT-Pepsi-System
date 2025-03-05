import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { earningsExpensesChartOption } from '@/utils/chartsLogic/earningsExpensesChartOption'
import { YearDropdown } from './EstimateAreaChartTwo'

const EstimateAreaChartThree = () => {
    return (
        <div className="col-lg-4">
            <div className="card stretch stretch-full">
                <div className="card-body p-0">
                    <div className="mb-4 border-bottom">
                        <Card
                            name={"Earnings"}
                            mony={"(+) $55,236"}
                            description={"Earnings is 69% more than last month."}
                            color={"text-success"}
                            chart_color={"#25b865"}
                        />
                    </div>
                    <div>
                        <Card
                            name={"Expenses"}
                            mony={"(-) $16,845"}
                            description={"Expenses is 47% more than last month."}
                            color={"text-danger"}
                            chart_color="#d13b4c"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EstimateAreaChartThree

const Card = ({ name, mony, description, color, chart_color }) => {
    const series = [{
        name: name,
        data: [25, 60, 20, 90, 45, 100, 55]
    }]
    const colors = [chart_color]
    const chartOption = earningsExpensesChartOption()
    return (
        <>
            <div className="p-4 d-flex align-items-start justify-content-between">
                <div>
                    <div className={`fs-12 fw-semibold mb-2 ${color}`}>{name}</div>
                    <h4 className={`mb-2 ${color}`}>{mony} USD</h4>
                    <div className="fs-12 text-muted text-truncate-1-line">{description}</div>
                </div>
                <YearDropdown />
            </div>
            <div className='pb-3'>
                <ReactApexChart
                    type='area'
                    options={{...chartOption, colors}}
                    series={series}
                    height={110}
                />
            </div>
        </>
    )
}
