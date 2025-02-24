import React, { useState } from 'react'
import { projectNotificationsOptions } from '@/utils/options';
import SelectDropdown from '@/components/shared/SelectDropdown';

const visibleTabsList = [
    { id: "visibleTabTasks", isChecked: true, label: "Tasks" },
    { id: "visibleTabTimesheets", isChecked: true, label: "Timesheets" },
    { id: "visibleTabMilestones", isChecked: true, label: "Milestones" },
    { id: "visibleTabFiles", isChecked: true, label: "Files" },
    { id: "visibleTabDiscussions", isChecked: true, label: "Discussions" },
    { id: "visibleTabGantt", isChecked: true, label: "GanttTickets" },
    { id: "visibleTabTickets", isChecked: true, label: "Tickets" },
    { id: "visibleTabContracts", isChecked: true, label: "Contracts" },
    { id: "visibleTabProposals", isChecked: true, label: "Proposals" },
    { id: "visibleTabEstimates", isChecked: true, label: "Estimates" },
    { id: "visibleTabInvoices", isChecked: true, label: "Invoices" },
    { id: "visibleTabSubscriptions", isChecked: true, label: "Subscriptions" },
    { id: "visibleTabExpenses", isChecked: true, label: "Expenses" },
    { id: "visibleTabNotes", isChecked: true, label: "Notes" },
    { id: "visibleTabActivity", isChecked: true, label: "Activity" }
];

const projectControlList = [
    { id: "visibleTabviewtasks", label: "Allow customer to view tasks", isChecked: true },
    { id: "visibleTabcreatetasks", label: "Allow customer to create tasks", isChecked: true },
    { id: "visibleTabedittasks", label: "Allow customer to edit tasks", isChecked: true },
    { id: "visibleTabprojecttasks", label: "Allow customer to comment on project tasks", isChecked: true },
    { id: "visibleTabtaskattachments", label: "Allow customer to view task attachments", isChecked: true },
    { id: "visibleTabchecklistitems", label: "Allow customer to view task checklist items", isChecked: true },
    { id: "visibleTabattachmentstasks", label: "Allow customer to upload attachments on tasks", isChecked: true },
    { id: "visibleTabloggedtime", label: "Allow customer to view task total logged time", isChecked: true },
    { id: "visibleTabuploadfiles", label: "Allow customer to upload files", isChecked: true },
    { id: "visibleTabopendiscussions", label: "Allow customer to open discussions", isChecked: true },
    { id: "visibleTabviewmilestones", label: "Allow customer to view milestones", isChecked: true },
    { id: "visibleTabviewtimesheet", label: "Allow customer to view timesheets", isChecked: true },
    { id: "visibleTabactivitylog", label: "Allow customer to view activity log", isChecked: true },
    { id: "visibleTabteammembers", label: "Allow customer to view team members", isChecked: true },
    { id: "visibleTabadminarea", label: "Hide project tasks on main tasks table (admin area)", isChecked: true }
]
const TabProjectSettings = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <section className="step-body mt-4 body current">
            <form id="project-settings">
                <fieldset>
                    <div className="mb-5">
                        <h2 className="fs-16 fw-bold">Project settings</h2>
                        <p className="text-muted">Settings for your project features here.</p>
                    </div>
                    <fieldset>
                        <div className="mb-4">
                            <label htmlFor="sendcontactsNotifications" className="form-label">Send contacts notifications</label>
                            <SelectDropdown
                                options={projectNotificationsOptions}
                                selectedOption={selectedOption}
                                defaultSelect="all"
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                    </fieldset>
                    <hr className="mb-5" />
                    <fieldset>
                        <div className="mb-5">
                            <h2 className="fs-16 fw-bold">Visible tabs</h2>
                            <p className="text-muted">Visible tabs for your project.</p>
                        </div>
                        <fieldset>
                            <div className="row">
                                {visibleTabsList.map(({ id, label, isChecked }) => <CheckboxCard key={id} id={id} label={label} isChecked={isChecked} className={"col-lg-4"} />)}
                            </div>
                        </fieldset>
                    </fieldset>
                    <hr className="mb-5" />
                    <fieldset>
                        <div className="mb-5">
                            <h2 className="fs-16 fw-bold">Project control</h2>
                            <p className="text-muted">Project control for your project.</p>
                        </div>
                        <fieldset>
                            {projectControlList.map(({ id, label, isChecked }) => <CheckboxCard key={id} id={id} label={label} isChecked={isChecked} />)}
                        </fieldset>
                    </fieldset>
                </fieldset>
            </form>
        </section>

    )
}

export default TabProjectSettings

const CheckboxCard = ({ label, id, isChecked, className }) => {
    return (
        <div className={className}>
            <div className="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" id={id} defaultChecked={isChecked} />
                <label className="custom-control-label c-pointer" htmlFor={id}>{label}</label>
            </div>
        </div>
    )
}