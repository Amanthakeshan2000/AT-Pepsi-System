import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProposalEditHeader from '@/components/proposalEditCreate/ProposalEditHeader'
import ProposalCreateContent from '@/components/proposalEditCreate/ProposalCreateContent'
import ProposalSent from '@/components/proposalEditCreate/ProposalSent'

const ProposalCreate = () => {
    return (
        <>
            <PageHeader>
                <ProposalEditHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    {/* <ProposalTable /> */}
                    <ProposalCreateContent />
                  
                </div>
            </div>
            <ProposalSent />
        </>
    )
}

export default ProposalCreate