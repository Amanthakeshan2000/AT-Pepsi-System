import React from 'react'
import ProposalTable from '@/components/proposal/ProposalTable'
import ProposalHeadr from '@/components/proposal/ProposalHeadr'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProposalHeaderContent from '@/components/proposal/ProposalHeaderContent'
import Footer from '@/components/shared/Footer'


const ProposalList = () => {


    return (
        <>
            <PageHeader>
                <ProposalHeadr />
            </PageHeader>
            <ProposalHeaderContent />
            <div className='main-content'>
                <div className='row'>
                    <ProposalTable />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProposalList


