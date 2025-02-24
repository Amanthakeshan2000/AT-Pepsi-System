import React from 'react'
import { Link } from 'react-router-dom'
import ReactApexChart from 'react-apexcharts'
import ImageGroup from '@/components/shared/ImageGroup'
import { estimateAreaChartOptions } from '@/utils/chartsLogic/estimateAreaChartOptions'
import { upcomingScheduleList } from '@/utils/fackData/upcomingScheduleList'

const CommentMiscellaneous = () => {
    const chartOption = estimateAreaChartOptions()
    const data = [10, 20, 18, 25, 12, 10, 20]
    return (
        <div className="col-xxl-4">
            <div className="card stretch stretch-full overflow-hidden">
                <div className="bg-danger text-white">
                    <div className="p-4">
                        <span className="badge bg-light text-primary text-dark float-end">12%</span>
                        <div className="text-start">
                            <h4 className="text-reset">1,254</h4>
                            <p className="text-reset m-0">Total Comment</p>
                        </div>
                    </div>
                    <ReactApexChart
                        options={{ ...chartOption, colors: ["#ff9999"] }}
                        series={[{ name: "Total Comment", data }]}
                        type='area'
                        height={150}
                    />
                </div>
                <div className="card-body">
                    {
                        upcomingScheduleList.slice(0, 2).map(({ date, id, schedule_name, team_members }) => {
                            return (
                                <div key={id} className="p-3 border border-dashed rounded-3 schedule-card">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="wd-50 ht-50 lh-1 d-flex align-items-center justify-content-center flex-column rounded-2 schedule-date">
                                                <span className="fs-18 fw-bold mb-1 d-block">{date.day}</span>
                                                <span className="fs-10 fw-semibold text-uppercase d-block">{date.month}</span>
                                            </div>
                                            <div className="text-dark">
                                                <Link to="#" className="fw-bold mb-2 text-truncate-1-line">{schedule_name}</Link>
                                                <span className="fs-11 fw-normal text-muted text-truncate-1-line">{date.time}</span>
                                            </div>
                                        </div>
                                        <div className="img-group lh-0 ms-3 justify-content-start d-none d-sm-flex">
                                            <ImageGroup data={team_members} avatarSize='avatar-md' />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <a href="#" className="fs-13">Read More →</a>
                </div>

            </div>
        </div>

    )
}

export default CommentMiscellaneous