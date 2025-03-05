import React from 'react'
import { FiAtSign, FiBell, FiCalendar, FiLifeBuoy, FiSettings, FiTrash2 } from 'react-icons/fi'
import ReactApexChart from 'react-apexcharts';
import Dropdown from '@/components/shared/Dropdown';
import ImageGroup from '@/components/shared/ImageGroup';
import getIcon from '@/utils/getIcon';
import { sellingStatusChartOptions } from '@/utils/chartsLogic/sellingStatusChartOptions';

export const optionsMiscellaneous = [
    { label: "New", icon: <FiAtSign /> },
    { label: "Event", icon: <FiCalendar /> },
    { label: "Snoozed", icon: <FiBell /> },
    { label: "Deleted", icon: <FiTrash2 /> },
    { type: "divider" },
    { label: "Settings", icon: <FiSettings /> },
    { label: "Tips & Tricks", icon: <FiLifeBuoy /> },
]
const avatarDataArray = [
    { type: 'image', user_img: '/images/avatar/2.png', user_name: 'Janette Dalton' },
    { type: 'image', user_img: '/images/avatar/3.png', user_name: 'Michael Ksen' },
    { type: 'image', user_img: '/images/avatar/4.png', user_name: 'Socrates Itumay' },
    { type: 'image', user_img: '/images/avatar/5.png', user_name: 'Marianne Audrey' },
    { type: 'image', user_img: '/images/avatar/6.png', user_name: 'Marianne Audrey' },
];
const salesInfoData = [
    { title: 'Weekly Bestseller', description: '10+ weekly bestseller', icon: 'feather-airplay', color: "primary", avatarDataArray },
    { title: 'Feature Sellers', description: '10+ feature sellers', icon: 'feather-award', color: "success", avatarDataArray },
    { title: 'Average Bestseller', description: '10+ average bestseller', icon: 'feather-bar-chart-2', color: "danger", avatarDataArray }
];
const SellingStatusMiscellaneous = () => {
    const chartOption = sellingStatusChartOptions()
    return (
        <div className="col-xxl-4">
            <div className="card stretch stretch-full overflow-hidden">
                <div className="bg-primary text-white">
                    <div className="p-4 d-flex justify-content-between align-items-center">
                        <h5 className="text-reset">Selling Status</h5>
                        <Dropdown dropdownItems={optionsMiscellaneous} />
                    </div>
                    <ReactApexChart
                        type='area'
                        options={chartOption}
                        series={chartOption?.series}
                        height={215}
                    />
                </div>
                <div className="card-body">
                    {salesInfoData.map((info, index) => (
                        <div key={index}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    <div className={`avatar-text avatar-lg bg-soft-${info.color} text-${info.color} border-soft-${info.color} rounded`}>
                                        <i className={"fs-16"} >{getIcon(info.icon)}</i>
                                    </div>
                                    <div>
                                        <a href="#" className="fw-bold mb-2">{info.title}</a>
                                        <p className="fs-12 text-muted mb-0">{info.description}</p>
                                    </div>
                                </div>
                                <div className="img-group lh-0 ms-2 justify-content-start">
                                    <ImageGroup data={info.avatarDataArray} avatarSize='avatar-md' />
                                </div>
                            </div>
                            {salesInfoData.length - 1 === index ? "" : <hr className="border-top-dashed" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default SellingStatusMiscellaneous