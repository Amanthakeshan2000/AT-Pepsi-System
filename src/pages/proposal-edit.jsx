import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProposalEditHeader from '@/components/proposalEditCreate/ProposalEditHeader'
import ProposalEditContent from '@/components/proposalEditCreate/ProposalEditContent'
import ProposalSent from '@/components/proposalEditCreate/ProposalSent'

const ProposalEdit = () => {
    return (
        <>
            <PageHeader>
                <ProposalEditHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    {/* <ProposalTable /> */}
                    <ProposalEditContent />
                </div>
            </div>
            <ProposalSent />
        </>
    )
}

export default ProposalEdit