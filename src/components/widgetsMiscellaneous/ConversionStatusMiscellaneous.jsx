import React from 'react'
import ReactApexChart from 'react-apexcharts';
import getIcon from '@/utils/getIcon';
import Dropdown from '@/components/shared/Dropdown';
import { conversionStatusChartOptions } from '@/utils/chartsLogic/conversionStatusChartOptions';
import { optionsMiscellaneous } from './SellingStatusMiscellaneous';

const widgetsData = [
    { icon: 'feather-airplay', bgColor: 'soft-primary', textColor: 'primary', title: 'Weekly Sales' },
    { icon: 'feather-layers', bgColor: 'soft-warning', textColor: 'warning', title: 'Sales Progress' },
    { icon: 'feather-briefcase', bgColor: 'soft-danger', textColor: 'danger', title: 'New Projects' },
    { icon: 'feather-shopping-cart', bgColor: 'soft-success', textColor: 'success', title: 'Items Orders' }
];


const ConversionStatusMiscellaneous = () => {
    const chartOption = conversionStatusChartOptions()
    return (
        <>
            <div className="col-xxl-4">
                <div className="card stretch stretch-full overflow-hidden">
                    <div className="bg-success text-white">
                        <div className="p-4 d-flex justify-content-between align-items-center">
                            <h5 className="text-reset">Conversion Status</h5>
                            <Dropdown dropdownItems={optionsMiscellaneous} />
                        </div>
                        <ReactApexChart
                            type='bar'
                            options={chartOption}
                            series={chartOption.series}
                            height={200}
                        />
                    </div>
                    <div className="card-body">
                        <div className="row g-4">
                            {widgetsData.map(({ icon, bgColor, textColor, title }, index) => (
                                <div key={index} className={`col-6`}>
                                    <a href="#" className={`d-block p-4 bg-${bgColor} text-${textColor} text-center rounded`}>
                                        <i className={"fs-3"} >{getIcon(icon)}</i>
                                        <h6 className="fs-13 text-reset mt-2">{title}</h6>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConversionStatusMiscellaneous