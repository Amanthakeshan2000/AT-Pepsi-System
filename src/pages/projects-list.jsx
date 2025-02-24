import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProjectsListHeader from '@/components/projectsList/ProjectsListHeader'
import ProjectTable from '@/components/projectsList/ProjectTable'

const ProjectsList = () => {
    return (
        <>
            <PageHeader>
                <ProjectsListHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProjectTable />
                </div>
            </div>

        </>
    )
}

export default ProjectsList