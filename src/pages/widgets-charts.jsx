import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PageHeaderWidgets  from '@/components/shared/pageHeader/PageHeaderWidgets'
import SiteOverviewChart from '@/components/widgetsCharts/SiteOverviewChart'
import EstimateBarChat from '@/components/widgetsCharts/EstimateBarChart'
import EstimateAreaChart from '@/components/widgetsCharts/EstimateAreaChart'
import EstimateAreaChartTwo from '@/components/widgetsCharts/EstimateAreaChartTwo'
import TasksOverviewChart from '@/components/widgetsCharts/TasksOverviewChart'
import InquiryChannelChart from '@/components/widgetsCharts/InquiryChannelChart'
import InquiryTrackingChart from '@/components/widgetsCharts/InquiryTrackingChart'
import TimeLoggedChart from '@/components/widgetsCharts/TimeLoggedChart'
import BillableTimeChart from '@/components/widgetsCharts/BillableTimeCart'
import LeadsOverviewChart from '@/components/widgetsCharts/LeadsOverviewChart'
import VisitorsOverviewChart from '@/components/widgetsCharts/VisitorsOverviewChart'
import TopCountryChart from '@/components/widgetsCharts/TopCountryChart'
import WebAnalyticsChart from '@/components/widgetsCharts/WebAnalyticsChart'
import BilledAreaChart from '@/components/widgetsCharts/BilledAreaChart'
import SalesPipelineChart from '@/components/widgetsCharts/SalesPipelineChart'
import DeviceUseChart from '@/components/widgetsCharts/DeviceUseChart'
import ProjectReportChart from '@/components/widgetsCharts/ProjectReportChart'
import TimeSpentChart from '@/components/widgetsCharts/TimeSpentChart'
import VisitorsChart from '@/components/widgetsCharts/VisitorsChart'
import TopCountryBarChart from '@/components/widgetsCharts/TopCountriyBarChart'
import EstimateBarChartTwo from '@/components/widgetsCharts/EstimateBarChartTwo'
import PerformanceCandlestickChart from '@/components/widgetsCharts/PerformanceCandlestickChart'
import Footer from '@/components/shared/Footer'
import PaymentRecordChartTwo from '@/components/widgetsCharts/PaymentRecordChartTwo'

const WidgetsCharts = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SiteOverviewChart />
                    <EstimateBarChat />
                    <EstimateAreaChart />
                    <EstimateAreaChartTwo />
                    <TasksOverviewChart />
                    <InquiryTrackingChart />
                    <InquiryChannelChart />
                    <TimeLoggedChart />
                    <BillableTimeChart />
                    <PaymentRecordChartTwo />
                    <LeadsOverviewChart chartHeight={290} isFooterShow={true}/>
                    <VisitorsOverviewChart />
                    <TopCountryChart />
                    <WebAnalyticsChart />
                    <BilledAreaChart />
                    <SalesPipelineChart />
                    <DeviceUseChart />
                    <ProjectReportChart />
                    <TimeSpentChart />
                    <VisitorsChart />
                    <TopCountryBarChart />
                    <EstimateBarChartTwo />
                    <PerformanceCandlestickChart />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default WidgetsCharts