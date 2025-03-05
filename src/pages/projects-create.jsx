import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProjectCreateContent from '@/components/projectsCreate/ProjectCreateContent'
import ProjectCreateHeader from '@/components/projectsCreate/ProjectCreateHeader'

const ProjectsCreate = () => {
    return (
        <>
            <PageHeader>
                <ProjectCreateHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProjectCreateContent />
                </div>
            </div>

        </>
    )
}

export default ProjectsCreate