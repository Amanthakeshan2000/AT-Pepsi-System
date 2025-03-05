import React from 'react'
import useCardTitleActions from '@/hooks/useCardTitleActions';
import ReactApexChart from 'react-apexcharts';
import { marketingCampaignChartOptions } from '@/utils/chartsLogic/marketingCampaignChartOptions';
import CardHeader from '@/components/shared/CardHeader';
import CardLoader from '@/components/shared/CardLoader';

const MarketingChart = () => {
    const chartOptions = marketingCampaignChartOptions()

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Marketing Campaign"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action p-0">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartOptions.series}
                        height={370}
                        type='bar'
                    />
                </div>
                <div className="card-footer">
                    <div className="row g-4">
                        <Card bg_color={"bg-primary"} price={"5,486"} progress={"81%"} title={"Reach"} />
                        <Card bg_color={"bg-success"} price={"42.75%"} progress={"82%"} title={"Opened"} />
                        <Card bg_color={"bg-danger"} price={"38.68%"} progress={"68%"} title={"Clicked"} />
                        <Card bg_color={"bg-dark"} price={"16.68%"} progress={"75%"} title={"Conversion"} />
                    </div>
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default MarketingChart

const Card = ({ title, price, progress, bg_color }) => {
    return (
        <div className="col-lg-3">
            <div className="p-3 border border-dashed rounded">
                <div className="fs-12 text-muted mb-1">{title}</div>
                <h6 className="fw-bold text-dark">{price}</h6>
                <div className="progress mt-2 ht-3">
                    <div className={`progress-bar ${bg_color}`} role="progressbar" style={{ width: progress }}></div>
                </div>
            </div>
        </div>
    )
}