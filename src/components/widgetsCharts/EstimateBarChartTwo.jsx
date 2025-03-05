import React from 'react'
import ReactApexChart from 'react-apexcharts';
import getIcon from '@/utils/getIcon';
import { estimateBarChartTwoOptions } from '@/utils/chartsLogic/estimateBarChartTwoOptions';
import { earningsExpensesChartOption } from '@/utils/chartsLogic/earningsExpensesChartOption';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardHeader from '@/components/shared/CardHeader';
import CardLoader from '@/components/shared/CardLoader';
import { YearDropdown } from './EstimateAreaChartTwo';

const EstimateBarChartTwo = () => {
    const chartOptions = estimateBarChartTwoOptions()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();
    if (isRemoved) {
        return null;
    }

    return (
        <>
            <div className="col-xxl-12">
                <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                    <CardHeader title={"Earning & Expense"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                    <div className="row g-0">
                        <div className="col-xl-8">
                            <ReactApexChart
                                type='bar'
                                options={chartOptions}
                                series={chartOptions.series}
                                height={480}
                            />
                        </div>
                        <div className="col-xl-4">
                            <div className="row">
                                <Card title="Earnings" amount="$55,236 USD" chartColor="#3454d1" color="primary" />
                                <Card title="Expenses" amount="$16,845 USD" chartColor="#ffa21d" color="warning" />
                            </div>
                        </div>
                    </div>
                    <CardLoader refreshKey={refreshKey} />
                </div>

            </div>
        </>
    )
}

export default EstimateBarChartTwo

const Card = ({ title, amount, percentage, chartColor, color }) => {
    const data = [25, 60, 20, 90, 45, 100, 55]
    const chartOption = earningsExpensesChartOption()
    return (
        <div className="col-xl-12 col-md-6">
            <div className="p-4">
                <div className="d-flex align-items-start justify-content-between">
                    <div>
                        <div className="fs-11 fw-medium text-muted text-uppercase">{title}</div>
                        <div className={`fs-20 fw-bolder text-${color}`}>{amount}</div>
                    </div>
                    <YearDropdown />
                </div>
                <div className="fs-12 text-muted">Earnings is {percentage} more than last month.</div>
                <div>
                    <ReactApexChart
                        type='area'
                        options={{ ...chartOption, colors: [chartColor] }}
                        series={[{ name: title, data }]}
                        height={110}
                    />
                </div>
            </div>
        </div>
    )
}