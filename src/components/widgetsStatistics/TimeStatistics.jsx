import React from 'react'
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi'

const data = [
    {
        id: 1,
        title: "Regular",
        time: {
            hour: 54,
            minute: 35
        },
        progress: 56.67,
        trendText: "Up from last week"
    },

    {
        id: 2,
        title: "Overtime",
        time: {
            hour: 12,
            minute: 40
        },
        progress: 23.49,
        trendText: "Down from last week"
    },
    {
        id: 3,
        title: "Billable",
        time: {
            hour: 35,
            minute: 30
        },
        progress: 43.85,
        trendText: "Up from last week"
    },
    {
        id: 4,
        title: "Unbillable",
        time: {
            hour: 10,
            minute: 25
        },
        progress: 20.46,
        trendText: "Down from last week"
    },

]
const TimeStatistics = () => {
    return (
        <>
            {
                data.map(({ id, progress, time, title, trendText }) => {
                    const isTrendUp = trendText.startsWith("Up")
                    return (
                        <div key={id} className="col-xxl-3 col-md-6">
                            <div className="card stretch stretch-full time-sheet-card">
                                <div className="card-body">
                                    <p className="fs-11 fw-semibold text-uppercase text-muted">{title}</p>
                                    <h4>
                                        <span className="counter">{time.hour}</span>H : <span className="counter">{time.minute}</span>M
                                    </h4>
                                    <div className="hstack gap-2 mt-3">
                                        <span className={`fs-11 badge bg-gray-100 ${isTrendUp ? "text-success" : "text-danger"}`}>
                                            <i className="fs-12 me-1">
                                                {
                                                    isTrendUp ?
                                                        <FiTrendingUp />
                                                        :
                                                        <FiTrendingDown />
                                                }
                                            </i>
                                            <span>{progress}%</span>
                                        </span>
                                        <span className="fs-11 text-muted">{trendText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default TimeStatistics