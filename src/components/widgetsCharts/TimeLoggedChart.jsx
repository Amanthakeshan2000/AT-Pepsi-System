import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import ReactApexChart from 'react-apexcharts'
import { timeLoggedChartOption } from '@/utils/chartsLogic/timeLoggedChartOption'

const TimeLoggedChart = () => {
    const chartOptions = timeLoggedChartOption()
    return (
        <div className="col-xxl-6">
            <div className="card stretch stretch-full">
                <CardHeader title={"Time Logged"} />
                <div className="card-body custom-card-action">
                    <ReactApexChart
                        type='area'
                        options={chartOptions}
                        series={chartOptions.series}
                        height={350}
                    />
                </div>
            </div>
        </div>
    )
}

export default TimeLoggedChart