import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PageHeaderWidgets  from '@/components/shared/pageHeader/PageHeaderWidgets'
import Schedule from '@/components/widgetsList/Schedule'
import Project from '@/components/widgetsList/Project'
import Progress from '@/components/widgetsList/Progress'
import Meeting from '@/components/widgetsList/Meeting'
import Todos from '@/components/widgetsList/Todos'
import Trending from '@/components/widgetsList/Trending'
import Accounts from '@/components/widgetsList/Accounts'
import Notifications from '@/components/widgetsList/Notifications'
import Feedback from '@/components/widgetsList/Feedback'
import Activity from '@/components/widgetsList/Activity'
import ActivityTwo from '@/components/widgetsList/ActivityTwo'
import Profile from '@/components/widgetsList/Profile'
import Socal from '@/components/widgetsList/Social'
import Suggestions from '@/components/widgetsList/Suggestions'
import Browser from '@/components/widgetsList/Browser'
import Tickets from '@/components/widgetsList/Tickets'
import Upgrade from '@/components/widgetsList/Upgrade'
import ScheduleTwo from '@/components/widgetsList/ScheduleTwo'
import InvoiceOverview from '@/components/widgetsList/InvoiceOverview'
import ProjectLeads from '@/components/widgetsList/ProjectLeads'
import { upcomingEventsData } from '@/utils/fackData/upcomingEventsData'
import Footer from '@/components/shared/Footer'
import UsersList from '@/components/widgetsList/UsersList'

const WidgetsLists = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <Schedule title={"Schedule"} />
                    <Project title={"Project"} borderShow={true} cardYSpaceClass={"hrozintioal-card"} />
                    <Progress title={"Progress"} footerShow={true} />
                    <Meeting title={"Meeting"} />
                    <UsersList title={"Users"} />
                    <Todos title={"Todos"} />
                    <Trending title={"Trending"} />
                    <Accounts title={"Accounts"} />
                    <Notifications title={"Notifications"} />
                    <Feedback title={"Feedback"} />
                    <Activity title={"Activity"} />
                    <ActivityTwo title={"Activity"} />
                    <div className="col-xxl-4 col-lg-6">
                        <Profile />
                    </div>
                    <Socal title={"Socal"}/>
                    <Suggestions title={"Suggestions"}/>
                    <Browser title={"Browser"}/>
                    <Tickets title={"Tickets"}/>
                    <Upgrade/>
                    <ScheduleTwo title={"Upcoming Activities"} data={upcomingEventsData} />
                    <InvoiceOverview title={"Invoice Overview"}/>
                    <ProjectLeads/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default WidgetsLists