import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { tasksOverviewChartOption } from '@/utils/chartsLogic/tasksOverviewChatOption'
import getIcon from '@/utils/getIcon'


const overviewInfo = [
    { title: "Tasks Completed", icon: "feather-star", total_number: "35", completed_number: "22", progress: "28", chartColor: "#3454d1", color: "primary" },
    { title: "New Tasks", icon: "feather-file-text", total_number: "20", completed_number: "5", progress: "34", chartColor: "#25b865", color: "success" },
    { title: "Project Done", icon: "feather-airplay", total_number: "30", completed_number: "20", progress: "42", chartColor: "#d13b4c", color: "danger" },
]

const TasksOverviewChart = () => {

    const data = [44, 55, 41, 60, 52, 66, 51]
    const chartOptions = tasksOverviewChartOption()

    return (
        <>
            {
                overviewInfo.map(({ completed_number, icon, id, progress, title, total_number, chartColor, color }, index) => {
                    return (
                        <div key={index} className="col-lg-4 task-overview-card">
                            <div className="card mb-4 stretch stretch-full">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <div className="d-flex gap-3 align-items-center">
                                        <div className="avatar-text">
                                            <i className='fs-16'>{getIcon(icon)}</i>
                                        </div>
                                        <div>
                                            <div className="fw-semibold text-dark">{title}</div>
                                            <div className="fs-12 text-muted">{completed_number}/{total_number} completed</div>
                                        </div>
                                    </div>
                                    <div className="fs-4 fw-bold text-dark">{completed_number}/{total_number}</div>
                                </div>
                                <div className="card-body d-flex align-items-center justify-content-between gap-4">
                                    <ReactApexChart
                                        options={{ ...chartOptions, colors: [chartColor] }}
                                        series={[{ name: title, data }]}
                                        type='area'
                                        height={100}
                                    />
                                    <div className="fs-12 text-muted text-nowrap">
                                        <span className={`fw-semibold text-${color}`}>{progress}% more</span><br />
                                        <span>from last week</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }
        </>
    )
}

export default TasksOverviewChart

