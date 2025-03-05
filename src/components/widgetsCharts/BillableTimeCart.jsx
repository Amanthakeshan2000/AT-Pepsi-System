import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import ReactApexChart from 'react-apexcharts'
import { billableTimeChartOption } from '@/utils/chartsLogic/billableTimeChartOption'

const BillableTimeChart = () => {
    const chartOptions = billableTimeChartOption()
    return (
        <div className="col-xxl-6">
            <div className="card stretch stretch-full">
                <CardHeader title={"Billable Time"} />

                <div className="card-body custom-card-action">
                    <ReactApexChart
                        type='bar'
                        options={chartOptions}
                        series={chartOptions?.series}
                        height={350}
                    />
                </div>
            </div>
        </div>
    )
}

export default BillableTimeChart