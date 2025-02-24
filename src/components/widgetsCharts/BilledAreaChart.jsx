import React, { Fragment } from 'react'
import ReactApexChart from 'react-apexcharts'
import CardHeader from '@/components/shared/CardHeader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'
import { billedAreaChartOptions } from '@/utils/chartsLogic/billedAreaChartOptions'


const BilledAreaChart = () => {
    const chartOptions = billedAreaChartOptions()
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
                    type='area'
                        options={chartOptions}
                        series={chartOptions.series}
                        height={262}
                    />
                </div>
                <div className="card-footer d-flex flex-wrap gap-4 p-4 pt-4 border-top border-gray-3">
                    <div className="flex-fill p-4 border border-dashed rounded text-center text-success">
                        <p className="fs-11 fw-semibold text-uppercase mb-2">Billable Hours</p>
                        <h2 className="fs-20 fw-bold mb-0 text-reset">$65,658 USD</h2>
                    </div>
                    <div className="flex-fill p-4 border border-dashed rounded text-center text-primary">
                        <p className="fs-11 fw-semibold text-uppercase mb-2">Unbillable Hours</p>
                        <h2 className="fs-20 fw-bold mb-0 text-reset">$30,540 USD</h2>
                    </div>
                </div>

                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default BilledAreaChart
