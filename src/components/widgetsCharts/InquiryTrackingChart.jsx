import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import ReactApexChart from 'react-apexcharts'
import { inquiryTrackingChartOption } from '@/utils/chartsLogic/inquiryTrackingChartOption'

const InquiryTrackingChart = () => {
    const chartOption = inquiryTrackingChartOption()
    return (
        <div className="col-xxl-6">
            <div className="card stretch stretch-full">
                <CardHeader title={"Inquiry Tracking"} />

                <div className="card-body custom-card-action">
                    <ReactApexChart
                        type='bar'
                        options={chartOption}
                        series={chartOption?.series}
                        height={350}
                    />
                </div>
            </div>
        </div>
    )
}

export default InquiryTrackingChart