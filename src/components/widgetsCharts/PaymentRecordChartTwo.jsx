import React from 'react'
import ReactApexChart from 'react-apexcharts';
import CardHeader from '@/components/shared/CardHeader';
import { paymentRecordChartOption } from '@/utils/chartsLogic/paymentRecordChartOption';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardLoader from '@/components/shared/CardLoader';

const PaymentRecordChartTwo = () => {
    const chartOptions = paymentRecordChartOption()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();


    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Payment Record"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartOptions.series}
                        height={377}
                    />
                    <div className="d-none d-md-flex flex-wrap pt-4 border-top">
                        <div className="flex-fill">
                            <p className="fs-11 fw-medium text-uppercase text-muted mb-2">Current</p>
                            <h2 className="fs-20 fw-bold mb-0">$65,658 USD</h2>
                        </div>
                        <div className="vr mx-4 text-gray-600" />
                        <div className="flex-fill">
                            <p className="fs-11 fw-medium text-uppercase text-muted mb-2">Overdue</p>
                            <h2 className="fs-20 fw-bold mb-0">$34,54 USD</h2>
                        </div>
                        <div className="vr mx-4 text-gray-600" />
                        <div className="flex-fill">
                            <p className="fs-11 fw-medium text-uppercase text-muted mb-2">Additional</p>
                            <h2 className="fs-20 fw-bold mb-0">$20,478 USD</h2>
                        </div>
                    </div>
                </div>

                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default PaymentRecordChartTwo
