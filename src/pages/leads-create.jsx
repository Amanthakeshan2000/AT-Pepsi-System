import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import LeadsCreateHeader from '@/components/leadsViewCreate/LeadsCreateHeader'
import LeadsCreateContent from '@/components/leadsViewCreate/LeadsCreateContent'

const LeadsCreate = () => {
    return (
        <>
            <PageHeader>
                <LeadsCreateHeader />
            </PageHeader>

            <div className='main-content'>
                <div className='row'>
                    <LeadsCreateContent/>
                </div>
            </div>
        </>
    )
}

export default LeadsCreate