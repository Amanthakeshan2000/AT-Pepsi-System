import React, { useState } from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown';
import { settingOptions } from './settingsEmailForm';
import MultiSelectTags from '@/components/shared/MultiSelectTags';
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting';
import Footer from '@/components/shared/Footer';

const statusOptions = [
    { value: 'open', label: 'Open', color: '#283c50' },
    { value: 'inprogress', label: 'In Progress', color: '#3454d1' },
    { value: 'answered', label: 'Answered', color: '#ea4d4d' },
    { value: 'onhold', label: 'On Hold', color: '#28a745' },
    { value: 'closed', label: 'Closed', color: '#ffa21d' }
];
const priorityOptions = [
    { value: 'low', label: 'Low', color: '#283c50' },
    { value: 'medium', label: 'Medium', color: '#3454d1' },
    { value: 'high', label: 'High', color: '#ea4d4d' },
    { value: 'urgent', label: 'Urgent', color: '#17c666' },
    { value: 'closed', label: 'Closed', color: '#ffa21d' }
];
const fileType = [
    { value: '.jpg', label: 'JPG', color: '#3454d1' },
    { value: '.png', label: 'PNG', color: '#17c666' },
    { value: '.pdf', label: 'PDF', color: '#ea4d4d' },
    { value: '.doc', label: 'DOC', color: '#64748b' },
    { value: '.zip', label: 'ZIP', color: '#283c50' },
    { value: '.rar', label: 'RAR', color: '#ffa21d' }
];
const orderOptions = [
    { value: 'ascending', label: 'Ascending', color: '#3454d1' },
    { value: 'descending', label: 'Descending', color: '#17c666' },
]
const SettingsSupportForm = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const options = settingOptions
    return (
        <div className="content-area" data-scrollbar-target="#psScrollbarInit">
            <PageHeaderSetting />
            <div className="content-area-body">
                <div className="card mb-0">
                    <div className="card-body">
                        <div className="mb-5">
                            <label className="form-label">Default status selected when replying to ticket</label>
                            <SelectDropdown
                                options={statusOptions}
                                defaultSelect={"answered"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Default status selected when replying to ticket [Ex: Open/Closed/Answered]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Default priority on piped ticket</label>
                            <SelectDropdown
                                options={priorityOptions}
                                defaultSelect={"medium"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Default priority on piped ticket [Ex: Low/Medium/High/Urgent/Closed]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allowed attachments file extensions</label>
                            <MultiSelectTags
                                options={fileType}
                                defaultSelect={[fileType[0], fileType[1], fileType[2], fileType[3], fileType[4], fileType[5]]}
                            />
                            <small className="form-text text-muted">Allowed attachments file extensions [Ex: Facebook/Google/Others]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Ticket Replies Order</label>
                            <SelectDropdown
                                options={orderOptions}
                                defaultSelect={"ascending"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Ticket Replies Order [Ex: Ascending/Descending]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allow staff to access only ticket that belongs to staff departments </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Allow staff to access only ticket that belongs to staff departments [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Send staff-related ticket notifications to the ticket assignee only </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Send staff-related ticket notifications to the ticket assignee only [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label"> Receive notification on new ticket opened </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted"> Receive notification on new ticket opened [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label"> Receive notification when customer reply to a ticket </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted"> Receive notification when customer reply to a ticket [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label"> Allow staff members to open tickets to all contacts? </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted"> Allow staff members to open tickets to all contacts? [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Automatically assign the ticket to the first staff that post a reply? </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Automatically assign the ticket to the first staff that post a reply? [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allow access to tickets for non staff members </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Allow access to tickets for non staff members [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allow non-admin staff members to delete ticket attachments </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Allow non-admin staff members to delete ticket attachments [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allow customer to change ticket status from customers area </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Allow customer to change ticket status from customers area [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">In customers area only show tickets related to the logged in contact (Primary contact not applied) </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">In customers area only show tickets related to the logged in contact (Primary contact not applied) [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Enable support menu item badge </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Enable support menu item badge [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Pipe Only on Registered Users </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Pipe Only on Registered Users [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Only Replies Allowed by Email </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Only Replies Allowed by Email [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-0">
                            <label className="form-label">Try to import only the actual ticket reply (without quoted/forwarded message) </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Try to import only the actual ticket reply (without quoted/forwarded message) [Ex: Yes/No]</small>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default SettingsSupportForm