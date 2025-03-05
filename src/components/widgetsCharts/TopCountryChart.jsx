import React, { Fragment } from 'react'
import ReactApexChart from 'react-apexcharts'
import CardHeader from '@/components/shared/CardHeader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'
import { FiLink2 } from 'react-icons/fi'
import { topCountryClickChartOptions } from '@/utils/chartsLogic/topCountryClickChartOption'

const countryStatsData = [
    { country: 'Australia', clicks: '2,258', flag: "/images/flags/4x3/au.svg" },
    { country: 'United States', clicks: '2,025', flag: "/images/flags/4x3/us.svg" },
    { country: 'Bangladesh', clicks: '1,836', flag: "/images/flags/4x3/bd.svg" },
];

const TopCountryChart = () => {
    const chartOptions = topCountryClickChartOptions()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full leads-overview ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Top Country"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-center" >
                        <ReactApexChart
                        type='donut'
                            options={chartOptions}
                            series={chartOptions.series}
                            width={340}
                        />
                    </div>
                    {countryStatsData.map(({ clicks, country, flag }, index) => (
                        <Fragment key={index}>
                            <hr className="border-dashed mt-1 mb-3" />
                            <div className="hstack justify-content-between">
                                <div className="hstack">
                                    <div className="me-3" >
                                        <img src={flag} alt='img' className='w-full rounded-0' style={{ height: "15px", width: "20px" }} />
                                    </div>
                                    <a href="#">
                                        <span>{country}</span>
                                        <FiLink2 className='fs-11 ms-1' />
                                    </a>
                                </div>
                                <div className="fs-11 fw-medium text-uppercase text-muted">{clicks} Clicks</div>
                            </div>
                        </Fragment>
                    ))}
                </div>


                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default TopCountryChart
