import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { siteOverviewData } from '@/utils/fackData/siteOverviewData'
import { siteOverviewChartOption } from '@/utils/chartsLogic/siteOverviewChartOption'

const SiteOverviewChart = () => {
  return (
    <>
      {
        siteOverviewData.map(({ average_user, id, prev_user, title, todays_user, colors }) => {
          const series = {
            name: title,
            data: [25, 60, 20, 90, 45, 100, 45, 100, 55]
          }

          const chartOption = siteOverviewChartOption(colors, series)

          return (
            <div key={id} className="col-xxl-3 col-md-6">
              <div className="card stretch stretch-full">
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between p-4 mb-4">
                    <div>
                      <div className="fw-bold mb-2 text-dark text-truncate-1-line">{title} (Avg)</div>
                      <div className="fs-11 text-muted">VS {prev_user}% (Prev)</div>
                    </div>
                    <div className="text-end">
                      <div className="fs-24 fw-bold mb-2 text-dark"><span className="counter">{average_user}</span>%</div>
                      {todays_user < prev_user ?
                        <div className="fs-11 text-danger">(- {todays_user}%)</div>
                        :
                        <div className="fs-11 text-success">(+ {todays_user}%)</div>
                      }
                    </div>
                  </div>
                  <ReactApexChart
                    type='area'
                    options={chartOption}
                    series={chartOption?.series}
                    height={80}
                  />
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

export default SiteOverviewChart
