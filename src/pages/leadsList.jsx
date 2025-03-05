import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import LeadsHeader from '@/components/leads/LeadsHeader'
import LeadssTable from '@/components/leads/LeadsTable'
import Footer from '@/components/shared/Footer'

const LeadsList = () => {
    return (
        <>
            <PageHeader>
                <LeadsHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <LeadssTable />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LeadsList