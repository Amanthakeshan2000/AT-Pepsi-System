import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PageHeaderWidgets  from '@/components/shared/pageHeader/PageHeaderWidgets'
import Footer from '@/components/shared/Footer'
import ProjectTracker from '@/components/widgetsTables/ProjectTracker'
import TimeLoggedChart from '@/components/widgetsCharts/TimeLoggedChart'
import BillableTimeChart from '@/components/widgetsCharts/BillableTimeCart'
import TimeStatistics from '@/components/widgetsStatistics/TimeStatistics'
import ProjectTimeMiscellaneous from '@/components/widgetsMiscellaneous/ProjectTimeMiscellaneous'

const ReportsTimesheets = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <TimeStatistics />
                    <TimeLoggedChart />
                    <BillableTimeChart />
                    <ProjectTimeMiscellaneous />
                    <ProjectTracker />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ReportsTimesheets