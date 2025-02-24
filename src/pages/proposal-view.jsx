import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProposalViewHeader from '@/components/proposalView/ProposalViewHeader'
import ProposalViewTab from '@/components/proposalView/ProposalViewTab'
import ProposalTabContent from '@/components/proposalView/ProposalTabContent'
import TasksTabContent from '@/components/proposalView/TasksTabContent'
import NotesTabContent from '@/components/proposalView/NotesTabContent'
import CommentTabContent from '@/components/proposalView/CommentTabContent'
import ProposalSent from '@/components/proposalEditCreate/ProposalSent'

const ProposalView = () => {
    return (
        <>
            <PageHeader>
                <ProposalViewHeader />
            </PageHeader>
            <ProposalViewTab />
            <div className='main-content'>
                <div className='tab-content'>
                    <ProposalTabContent />
                    <TasksTabContent />
                    <NotesTabContent />
                    <CommentTabContent />
                    {/* <ProposalTable /> */}
                </div>
            </div>
            <ProposalSent />
        </>
    )
}

export default ProposalView