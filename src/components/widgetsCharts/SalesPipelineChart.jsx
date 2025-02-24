import React, { useState } from 'react'
import CardHeader from '@/components/shared/CardHeader'
import ReactApexChart from 'react-apexcharts'
import { salesPipelineChartOption } from '@/utils/chartsLogic/salesPipelineChartOption'
import { salesPipelineData } from '@/utils/fackData/salesPipelineData'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'


const SalesPipelineChart = ({ isFooterShow }) => {
    const [activeTab, setActiveTab] = useState("Leads")
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Sales Pipeline"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action">
                    <ul className="nav mb-4 gap-4 sales-pipeline-tabs" role="tablist">
                        {
                            salesPipelineData.map(({ deals, name, revenue }) => {
                                return (
                                    <li key={name} className="nav-item" role="presentation">
                                        <a href="#"
                                            onClick={() => setActiveTab(name)}
                                            className={`nav-link text-start ${name === activeTab ? "active" : ""}`}
                                            data-bs-toggle="tab"
                                            data-bs-target={`#${name}`}
                                            role="tab"
                                        >
                                            <span className="fw-semibold text-dark d-block">{name}</span>
                                            <span className="amount fs-18 fw-bold my-1 d-block">${revenue}</span>
                                            <span className="deals fs-12 text-muted d-block">{deals} Deals</span>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="tab-content">
                        {
                            salesPipelineData.map(({ name, data, chartColors }) =>
                                <TabCard key={name} activeTab={activeTab} name={name} data={data} chartColors={chartColors} />
                            )
                        }
                    </div>
                    <CardLoader refreshKey={refreshKey} />
                </div>
                {
                    isFooterShow &&
                    <div className="card-footer d-md-flex flex-wrap p-4 pt-5 border-top border-gray-5">
                        <div className="flex-fill mb-4 mb-md-0 pb-2 pb-md-0">
                            <p className="fs-11 fw-semibold text-uppercase text-primary mb-2">Current</p>
                            <h2 className="fs-20 fw-bold mb-0">$65,658 USD</h2>
                        </div>
                        <div className="vr mx-4 text-gray-600 d-none d-md-flex"></div>
                        <div className="flex-fill mb-4 mb-md-0 pb-2 pb-md-0">
                            <p className="fs-11 fw-semibold text-uppercase text-danger mb-2">Overdue</p>
                            <h2 className="fs-20 fw-bold mb-0">$34,54 USD</h2>
                        </div>
                        <div className="vr mx-4 text-gray-600 d-none d-md-flex"></div>
                        <div className="flex-fill">
                            <p className="fs-11 fw-semibold text-uppercase text-success mb-2">Additional</p>
                            <h2 className="fs-20 fw-bold mb-0">$20,478 USD</h2>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SalesPipelineChart

const TabCard = ({ name, activeTab, data, chartColors }) => {
    const series = { name, data }

    const copyData = [...data]
    copyData.sort((a, b) => b - a);
    const maxValue = copyData[0];

    const chartOption = salesPipelineChartOption(series, chartColors, maxValue)
    return (
        <div
            className={`tab-pane fade show ${name === activeTab ? "active" : ""}`}
            id={name}
            role="tabpanel"
        >
            <ReactApexChart
                type='bar'
                options={chartOption}
                series={chartOption?.series}
                height={352}
            />
        </div>
    )
}
