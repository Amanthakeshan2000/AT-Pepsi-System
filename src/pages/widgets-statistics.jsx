import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PageHeaderWidgets  from '@/components/shared/pageHeader/PageHeaderWidgets'
import SiteOverviewStatistics from '@/components/widgetsStatistics/SiteOverviewStatistics'
import EstimateStatistics from '@/components/widgetsStatistics/EstimateStatistics'
import EstimateStatisticsTwo from '@/components/widgetsStatistics/EstimateStatisticsTwo'
import UserOverviewStatistics from '@/components/widgetsStatistics/UserOverviewStatistics'
import LeadsStatistics from '@/components/widgetsStatistics/LeadsStatistics'
import TimeStatistics from '@/components/widgetsStatistics/TimeStatistics'
import EstimateStatisticsThree from '@/components/widgetsStatistics/EstimateStatisticsThree'
import PaymentStatistics from '@/components/widgetsStatistics/PaymentStatistics'
import CustomersStatistics from '@/components/widgetsStatistics/CustomersStatistics'
import ProjectsStatistics from '@/components/widgetsStatistics/ProjectsStatistics'
import LeadsStatisticsTwo from '@/components/widgetsStatistics/LeadsStatisticsTwo'
import TimeStatisticsTwo from '@/components/widgetsStatistics/TimeStatisticsTwo'
import OrdersStatistics from '@/components/widgetsStatistics/OrdersStatistics'
import UserOverviewStatisticsTwo from '@/components/widgetsStatistics/UserOverviewStatisticsTwo'
import ProjectsStatisticsTwo from '@/components/widgetsStatistics/ProjectsStatisticsTwo'
import UserOverviewStatisticsThree from '@/components/widgetsStatistics/UserOverviewStatisticsThree'
import SocilMediaStatistics from '@/components/widgetsStatistics/SocilMediaStatistics'
import Footer from '@/components/shared/Footer'

const WidgetsStatistics = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SiteOverviewStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <EstimateStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <EstimateStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <UserOverviewStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <LeadsStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <TimeStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <EstimateStatisticsThree />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <PaymentStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <CustomersStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <ProjectsStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <LeadsStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <TimeStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <OrdersStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <UserOverviewStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <ProjectsStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <UserOverviewStatisticsThree />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <SocilMediaStatistics />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default WidgetsStatistics