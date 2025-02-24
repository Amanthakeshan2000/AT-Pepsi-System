import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PageHeaderWidgets  from '@/components/shared/pageHeader/PageHeaderWidgets'
import LatestLeads from '@/components/widgetsTables/LatestLeads'
import TopSelling from '@/components/widgetsTables/TopSelling'
import Remainders from '@/components/widgetsTables/Remainders'
import Tickets from '@/components/widgetsList/Tickets'
import Countries from '@/components/widgetsTables/Countries'
import LeadsStatus from '@/components/widgetsTables/LeadsStatus'
import ContactLeads from '@/components/widgetsTables/ContactLeads'
import Support from '@/components/widgetsTables/Support'
import ProjectsTwo from '@/components/widgetsTables/ProjectsTwo'
import Campaign from '@/components/widgetsTables/Campaign'
import VisitedPages from '@/components/widgetsTables/VisitedPages'
import ProgressTwo from '@/components/widgetsTables/ProgressTwo'
import ProjectTracker from '@/components/widgetsTables/ProjectTracker'
import Tasks from '@/components/widgetsTables/Tasks'
import InvoiceSummary from '@/components/widgetsTables/InvoiceSummary'
import TrafficReports from '@/components/widgetsTables/TrafficReports'
import Store from '@/components/widgetsTables/Store'
import Customers from '@/components/widgetsTables/Customers'
import Orders from '@/components/widgetsTables/Orders'
import Footer from '@/components/shared/Footer'

const WidgetsTables = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <LatestLeads title={"Leads"} />
                    <TopSelling title={"Top Selling"} />
                    <Remainders title={"Remainders"} />
                    <Tickets title={"Tickets"} paginationShow={true} />
                    <LeadsStatus title={"Leads Status"} />
                    <Countries title={"Countries"} />
                    <ContactLeads title={"Contact Leads"} />
                    <Support title={"Support Inbox"} />
                    <Campaign title={"Campaign"} />
                    <VisitedPages title={"Visited Pages"} />
                    <ProjectsTwo title={"Projects Stats"} className="col-xxl-6" />
                    <ProgressTwo title={"Project Progress"} />
                    <ProjectTracker />
                    <Tasks title={"Latest Tasks"} />
                    <InvoiceSummary title={"Invoice Summary"} />
                    <TrafficReports title={"Traffic Reports"} />
                    <Store title={"Store Overview"}/>
                    <Customers title={"New Customers"}/>
                    <Orders title={"Recent Orders"}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default WidgetsTables