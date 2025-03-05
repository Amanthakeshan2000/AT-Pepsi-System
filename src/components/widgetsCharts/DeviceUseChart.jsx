import React from 'react'
import ReactApexChart from 'react-apexcharts'
import CardHeader from '@/components/shared/CardHeader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'
import { deviceUseChartOptions } from '@/utils/chartsLogic/deviceUseChartOptions'
import getIcon from '@/utils/getIcon'

const deviceStatsData = [
    { deviceType: 'Desktop', icon: 'feather-monitor', deviceCount: '64K', chartColor: "#FF9F43" },
    { deviceType: 'Mobile', icon: 'feather-smartphone', deviceCount: '45K', chartColor: "#475e77" },
    { deviceType: 'Tablet', icon: 'feather-tablet', deviceCount: '25K', chartColor: "#DC3545" },
    { deviceType: 'Others', icon: 'feather-compass', deviceCount: '15K', chartColor: "#3454D1" },
];

const DeviceUseChart = () => {
    const chartOptions = deviceUseChartOptions()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();
    if (isRemoved) {
        return null;
    }

    let data = []
    let labels = []
    let colors = []

    deviceStatsData.forEach(({ deviceCount, deviceType, chartColor }) => {
        const removeString = deviceCount.replace(/[^\d.]/g, '')
        const number = Number(removeString)
        data.push(number)

        labels.push(deviceType)
        colors.push(chartColor)
    })



    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full leads-overview ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Session Device"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action">
                    <div className="d-flex align-items-center justify-content-center mb-3" >
                        <ReactApexChart
                            type='donut'
                            options={{ ...chartOptions, labels, colors }}
                            series={data}
                            width={310}
                        />
                    </div>
                    <div className="row g-3">
                        {deviceStatsData.map(({ deviceCount, icon, deviceType }, index) => (
                            <div key={index} className="col-md-6">
                                <div className="p-3 border border-dashed rounded text-center">
                                    <div className="avatar-text avatar-md bg-gray-200 mb-1 mx-auto">
                                        <i className=''>{getIcon(icon)}</i>
                                    </div>
                                    <div className="fs-12 fw-medium text-muted pt-2 pb-1">{deviceType} Device</div>
                                    <div className="fs-18 fw-bolder text-dark">{deviceCount}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default DeviceUseChart
