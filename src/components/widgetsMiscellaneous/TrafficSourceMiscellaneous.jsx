import React from 'react'
import Dropdown from '@/components/shared/Dropdown';
import { optionsMiscellaneous } from './SellingStatusMiscellaneous';
import getIcon from '@/utils/getIcon';
import ReactApexChart from 'react-apexcharts';
import { trafficChartOptions } from '@/utils/chartsLogic/trafficChartOptions';
const trafficData = [
    { icon: 'feather-airplay', bgClass: 'border-soft-primary', text: 'Organic Traffics', value: '8,865' },
    { icon: 'feather-layers', bgClass: 'border-soft-warning', text: 'Referral Traffics', value: '6,579' },
    { icon: 'feather-link-2', bgClass: 'border-soft-danger', text: 'Affiliates Traffics', value: '5,865' },
    { icon: 'feather-bookmark', bgClass: 'border-soft-success', text: 'Others Traffics', value: '2,354' },
];


const TrafficSourceMiscellaneous = () => {
    const chartOptions = trafficChartOptions()
    return (
        <div className="col-xxl-4">
            <div className="card stretch stretch-full overflow-hidden">
                <div className="bg-danger text-white">
                    <div className="p-4 d-flex justify-content-between align-items-center">
                        <h5 className="text-reset">Traffic Source</h5>
                        <Dropdown dropdownItems={optionsMiscellaneous} />
                    </div>
                    <ReactApexChart
                        type='area'
                        height={215}
                        options={chartOptions}
                        series={chartOptions.series}
                    />
                </div>
                <div className="card-body">
                    <div className="row g-4">
                        {trafficData.map(({ icon, bgClass, text, value }, index) => (
                            <div key={index} className="col-6">
                                <a href="#" className={`d-block p-4 text-center border border-dashed ${bgClass} rounded position-relative`}>
                                    <div className="avatar-text avatar-md bg-soft-primary text-primary border-soft-primary position-absolute top-0 start-50 translate-middle">
                                        <i className={"lh-1"} >{getIcon(icon)}</i>
                                    </div>
                                    <div>
                                        <div className="fs-12 text-muted mb-2">{text}</div>
                                        <h3>{value}</h3>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TrafficSourceMiscellaneous