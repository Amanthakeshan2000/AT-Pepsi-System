import React from 'react'
import { Link } from 'react-router-dom'
import ReactApexChart from 'react-apexcharts'
import CardHeader from '@/components/shared/CardHeader'
import { leadsUserOverview } from '@/utils/fackData/userOverview'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import { leadsOverviewChartOptions } from '@/utils/chartsLogic/leadsOverviewChartOptions'
import CardLoader from '@/components/shared/CardLoader'



const LeadsOverviewChart = ({ chartHeight, isFooterShow }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full leads-overview ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Leads Overview"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action">
                    <ReactApexChart
                        options={leadsOverviewChartOptions}
                        series={leadsOverviewChartOptions.series}
                        type='donut'
                        height={chartHeight}
                    />
                    <div className="row g-2 pt-2">
                        {leadsUserOverview.map(({ id, number, title }) => {
                            return (
                                <div key={id} className="col-4">
                                    <Link href="#" className="p-2 hstack gap-2 rounded border border-dashed border-gray-5">
                                        <span className={`wd-7 ht-7 rounded-circle d-inline-block circle-${id}`}></span>
                                        <span>{title}<span className="fs-10 text-muted ms-1">({number}K)</span></span>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {isFooterShow && <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Update: 50 Min Ago</Link>}
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default LeadsOverviewChart
