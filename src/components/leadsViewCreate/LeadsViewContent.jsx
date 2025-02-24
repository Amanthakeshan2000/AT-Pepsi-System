import React from 'react'
import TabLeadsProfile from './TabLeadsProfile'
import LeadsEmptyCard from './LeadsEmptyCard'

const LeadsViewContent = () => {
    return (
        <>

            <TabLeadsProfile />
            <div className="tab-pane fade" id="proposalTab" role="tabpanel">
                <LeadsEmptyCard title={"No proposals yet!"} description={"There is no proposals create yet."} />
            </div>
            <div className="tab-pane fade" id="tasksTab" role="tabpanel">
                <LeadsEmptyCard title={"No tasks yet!"} description={"There is no tasks create yet."} />
            </div>
            <div className="tab-pane fade" id="notesTab" role="tabpanel">
                <LeadsEmptyCard title={"No notes yet!"} description={"There is no notes create yet."} />
            </div>
            <div className="tab-pane fade" id="commentTab" role="tabpanel">
                <LeadsEmptyCard title={"No comment yet!"} description={"There is no comment create yet."} />
            </div>
        </>
    )
}

export default LeadsViewContent