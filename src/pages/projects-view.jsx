import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProjectViewHeader from '@/components/projectsView/ProjectViewHeader'
import ProjectViewTabItems from '@/components/projectsView/ProjectViewTabItems'
import TabProjectOverview from '@/components/projectsView/TabProjectOverview'
import LeadsEmptyCard from '@/components/leadsViewCreate/LeadsEmptyCard'

const ProjectsView = () => {
    return (
        <>
            <PageHeader>
                <ProjectViewHeader />
            </PageHeader>
            <ProjectViewTabItems />
            <div className='main-content'>
                <div className='tab-content'>
                    <TabProjectOverview />
                    <div className="tab-pane fade" id="activityTab"><LeadsEmptyCard title="No activity yet!" description="There is no activity on this project"/></div>
                    <div className="tab-pane fade" id="timesheetsTab"><LeadsEmptyCard title="No timesheets yet!" description="There is no timesheets on this project"/></div>
                    <div className="tab-pane fade" id="milestonesTab"><LeadsEmptyCard title="No milestones yet!" description="There is no milestones on this project"/></div>
                    <div className="tab-pane fade" id="discussionsTab"><LeadsEmptyCard title="No discussions yet!" description="There is no discussions on this project"/></div>
                </div>
            </div>

        </>
    )
}

export default ProjectsView