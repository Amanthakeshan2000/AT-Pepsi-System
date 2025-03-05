import React from 'react'
import { FiBarChart2, FiCalendar, FiCheckCircle, FiClock, FiLink2 } from 'react-icons/fi'
import ImageGroup from '@/components/shared/ImageGroup'
import getIcon from '@/utils/getIcon'
import ReactApexChart from 'react-apexcharts'
import { projectViewAreaChartOptions } from '@/utils/chartsLogic/projectViewAreaChartOptions'

export const imageList = [
    {
        id: 1,
        user_name: "Janette Dalton",
        user_img: "/images/avatar/2.png"
    },
    {
        id: 2,
        user_name: "Mikal Bon",
        user_img: "/images/avatar/3.png"
    },
    {
        id: 3,
        user_name: "Socrates Itumay",
        user_img: "/images/avatar/4.png"
    },
    {
        id: 4,
        user_name: "Jakson Jak",
        user_img: "/images/avatar/6.png"
    },
    {
        id: 5,
        user_name: "Socrates Itumay",
        user_img: "/images/avatar/5.png"
    },
]
const TabProjectOverview = () => {
    const chartOptions = projectViewAreaChartOptions()
    return (
        <div className="tab-pane fade active show" id="overviewTab">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card stretch stretch-full">
                        <div className="card-body task-header d-md-flex align-items-center justify-content-between">
                            <div className="me-4">
                                <h4 className="mb-4 fw-bold d-flex">
                                    <span className="text-truncate-1-line">Duralux || CRM Applications &amp; Admin Dashboar <span className="badge bg-soft-primary text-primary mx-3">In Prograss</span></span>
                                </h4>
                                <div className="d-flex align-items-center">
                                    <div className="filter-dropdown">
                                        <a className="btn btn-icon btn-light-brand dropdown-toggle" data-bs-toggle="dropdown" data-bs-offset="0, 10"> CRM Dashboard </a>
                                        <div className="dropdown-menu wd-300">
                                            <a href="#" className="dropdown-item">
                                                <span> #01 - CRM Applications</span>
                                                <span className="fs-12 fw-normal text-muted">- G.Cute</span>
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                <span> #02 - Admin Dashboard</span>
                                                <span className="fs-12 fw-normal text-muted">- A.Cantones</span>
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                <span> #03 - Webapps Applications</span>
                                                <span className="fs-12 fw-normal text-muted">- M.Hanvey</span>
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                <span> #04 - Dashboard Redesign</span>
                                                <span className="fs-12 fw-normal text-muted">- K.Hune</span>
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                <span> #05 - Applications Debugging</span>
                                                <span className="fs-12 fw-normal text-muted"> - V.Maton</span>
                                            </a>
                                            <div className="dropdown-divider" />
                                            <a href="#" className="dropdown-item">
                                                <span> Explorer More Projects </span>
                                            </a>
                                        </div>
                                    </div>
                                    <span className="vr mx-3 text-muted" />
                                    <div className="img-group lh-0 ms-2 justify-content-start">
                                        <ImageGroup data={imageList} avatarSize='avatar-md' />
                                        <span className="d-none d-sm-flex">
                                            <span className="fs-12 text-muted ms-3 text-truncate-1-line">24+ members</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 mt-md-0">
                                <div className="d-flex gap-2">
                                    <a href="#" className="btn btn-icon" data-bs-toggle="tooltip" title="Make as Complete">
                                        <FiCheckCircle size={16} />
                                    </a>
                                    <a href="#" className="btn btn-icon" data-bs-toggle="tooltip" title="Timesheets">
                                        <FiCalendar size={16} />
                                    </a>
                                    <a href="#" className="btn btn-icon" data-bs-toggle="tooltip" title="Statistics">
                                        <FiBarChart2 size={16} />
                                    </a>
                                    <a href="#" className="btn btn-success" data-bs-toggle="tooltip" title="Timesheets">
                                        <FiClock size={16} className='me-2' />
                                        <span>Start Timer</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <div className="w-100">
                                <div className="d-flex align-items-center justify-content-between">
                                    <a href="#" className="fs-12 fw-medium text-muted">
                                        <span className="text-truncate-1-line">Projects In Progress <FiLink2 className='fs-11 ms-1' /></span>
                                    </a>
                                    <div className="ms-3">
                                        <span className="fs-12 text-muted text-truncate-1-line">16/25 Tasks Completed <span className="fs-11 text-muted">(78%)</span></span>
                                    </div>
                                </div>
                                <div className="progress mt-2 ht-5">
                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '78%' }} />
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Project</label>
                                    <p>#01 - CRM Applications - G.Cute</p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Billing Type </label>
                                    <p>Project Hours</p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Status</label>
                                    <p>In Progress</p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Customer</label>
                                    <p>Green Cute</p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Start Date </label>
                                    <p>2023-02-25</p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">End Date </label>
                                    <p>2023-03-20</p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Hourly Rate</label>
                                    <p>$25.00</p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Logged Hours</label>
                                    <p>00:00:00</p>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">Description</label>
                                    <p>CRM (Customer Relationship Management) applications are software tools that help organizations manage interactions with their customers, streamline sales and marketing activities, and improve overall customer satisfaction. There are many different CRM applications available, ranging from simple contact management tools to more sophisticated platforms that integrate with other business systems.</p>
                                    <p className="fw-semibold mt-4">Some of the common features of CRM applications include:</p>
                                    <ul>
                                        <li>Contact Management: Allows organizations to store and manage customer data, including names, addresses, phone numbers, and email addresses.</li>
                                        <li>Sales Management: Helps organizations manage their sales pipeline, track leads and deals, and analyze sales performance.</li>
                                        <li>Marketing Automation: Helps organizations automate their marketing processes, including email marketing, social media campaigns, and lead generation.</li>
                                        <li>Customer Service and Support: Allows organizations to track and manage customer service requests and provide support to customers via various channels.</li>
                                        <li>Analytics and Reporting: Provides insights into customer behavior, sales trends, and other key metrics that help organizations make data-driven decisions.</li>
                                    </ul>
                                    <p className="mb-0">Some popular CRM applications include Salesforce, Microsoft Dynamics 365, HubSpot, Zoho CRM, and Freshsales. The choice of CRM application depends on an organization's specific needs and budget.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="row">
                        <HourCard
                            icon="feather-log-in"
                            color="primary"
                            title="Logged Hours"
                            hours="00:00"
                            totalBilled="00:00"
                        />
                        <HourCard
                            icon="feather-clipboard"
                            color="warning"
                            title="Billable Hours"
                            hours="00:00"
                            totalBilled="00:00"
                        />
                        <HourCard
                            icon="feather-check"
                            color="success"
                            title="Billed Hours"
                            hours="00:00"
                            totalBilled="00:00"
                        />
                        <HourCard
                            icon="feather-x"
                            color="danger"
                            title="Unbilled Hour"
                            hours="00:00"
                            totalBilled="00:00"
                        />
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-md-6">
                            <div className="card stretch stretch-full">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="fw-semibold">16 / 25 Open Tasks</div>
                                        <i className="text-warning"><FiCheckCircle size={16} /></i>
                                    </div>
                                    <div className="progress mt-2 ht-3">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '78%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-md-6">
                            <div className="card stretch stretch-full">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="fw-semibold">25 / 25 Days Left</div>
                                        <i className="text-success" ><FiCalendar size={16} /></i>
                                    </div>
                                    <div className="progress mt-2 ht-3">
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card stretch stretch-full">
                        <ReactApexChart
                            options={chartOptions}
                            series={chartOptions?.series}
                            type='area'
                            height={270}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TabProjectOverview


const HourCard = ({ icon, color, textColorClass, title, hours, totalBilled }) => {
    return (
        <div className="col-xxl-6 col-xl-12 col-sm-6">
            <div className="card stretch stretch-full">
                <div className="card-body">
                    <div className={`avatar-text bg-soft-${color} text-${color} border-0 mb-3`}>
                        {React.cloneElement(getIcon(icon), { size: "16" })}
                    </div>
                    <p><span className={`fw-bold text-${color}`}>{title}:</span> {hours}</p>
                    <div><span className="fw-bold text-dark">Total Billed:</span> {totalBilled}</div>
                </div>
            </div>
        </div>
    );
};
