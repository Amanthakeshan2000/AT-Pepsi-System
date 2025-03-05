import React from 'react'
import ProjectDateLineMiscellaneous from '@/components/widgetsMiscellaneous/ProjectDateLineMiscellaneous'
import Progress from '@/components/widgetsList/Progress'
import ActiveProject from '@/components/widgetsList/Project'
import Schedule from '@/components/widgetsList/Schedule'
import PageHeaderWidgets  from '@/components/shared/pageHeader/PageHeaderWidgets'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'
import ProjectsTwo from '@/components/widgetsTables/ProjectsTwo'
import ProjectReportChart from '@/components/widgetsCharts/ProjectReportChart'
import TimeSpentChart from '@/components/widgetsCharts/TimeSpentChart'
import EventCalendarSmall from '@/components/EventCalendarSmall'

const ReportsProject = () => {
  return (
    <>
      <PageHeader >
        <PageHeaderWidgets />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <ProjectDateLineMiscellaneous />
          <ProjectReportChart />
          <div className="col-xxl-4">
            <div className="card stretch stretch-full">
              <EventCalendarSmall />
            </div>
          </div>
          <TimeSpentChart />
          <Progress title={"Team Progress"} footerShow={false} />
          <ActiveProject cardYSpaceClass="mb-4 pb-1" title="Active Project" />
          <ProjectsTwo title={"Projects Stats"} className={"col-xxl-8"} />
          <Schedule />
        </div>
      </div >
      <Footer />
    </>
  )
}

export default ReportsProject