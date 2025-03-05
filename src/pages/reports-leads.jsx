import React from 'react'
import ScheduleTwo from '@/components/widgetsList/ScheduleTwo'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PageHeaderWidgets  from '@/components/shared/pageHeader/PageHeaderWidgets'
import Footer from '@/components/shared/Footer'
import { upcomingEventsData } from '@/utils/fackData/upcomingEventsData'
import ProjectLeads from '@/components/widgetsList/ProjectLeads'
import InquiryTrackingChart from '@/components/widgetsCharts/InquiryTrackingChart'
import InquiryChannelChart from '@/components/widgetsCharts/InquiryChannelChart'
import LeadsStatistics from '@/components/widgetsStatistics/LeadsStatistics'
import LeadsStatusTwo from '@/components/widgetsTables/LeadsStatusTwo'

const ReportsLeads = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <LeadsStatistics />
                    <InquiryTrackingChart />
                    <InquiryChannelChart />
                    <LeadsStatusTwo />
                    <ScheduleTwo title={"Upcoming Events"} data={upcomingEventsData.slice(0, 3)} />
                    <ProjectLeads />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ReportsLeads