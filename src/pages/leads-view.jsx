import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import LeadsViewHeader from '@/components/leadsViewCreate/LeadsViewHeader'
import LeadsViewContent from '@/components/leadsViewCreate/LeadsViewContent'
import LeadsViewTab from '@/components/leadsViewCreate/LeadsViewTab'

const LeadsView = () => {
    return (
        <>
            <PageHeader>
                <LeadsViewHeader />
            </PageHeader>
            <LeadsViewTab />
            <div className='main-content'>
                <div className='tab-content'>
                    {/* <LeadssTable /> */}
                    <LeadsViewContent />
                </div>
            </div>
        </>
    )
}

export default LeadsView