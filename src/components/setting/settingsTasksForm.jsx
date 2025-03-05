import React, { useState } from 'react'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Footer from '@/components/shared/Footer'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { taskPriorityOptions, taskStatusOptions } from '@/utils/options'
import { settingOptions } from './settingsEmailForm'


const roundOptions = [
    { value: "don't-round-up", label: "Don't Round Up" },
    { value: "round-up", label: "Round Up" },
    { value: "round-down", label: "Round Down" },
    { value: "round-to-nearest", label: "Round to Nearest" },
]

const SettingsTasksForm = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const priority = taskPriorityOptions
    const status = taskStatusOptions
    const options = settingOptions
    return (
        <div className="content-area" data-scrollbar-target="#psScrollbarInit">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="mb-5">
                                <label className="form-label">Allow all staff to see all tasks related to projects (includes non-staff)</label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow all staff to see all tasks related to projects (includes non-staff) [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Allow customer/staff to add/edit task comments only in the first hour (administrators not applied) </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow customer/staff to add/edit task comments only in the first hour (administrators not applied) [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label"> Auto assign task creator when new task is created </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted"> Auto assign task creator when new task is created [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Auto add task creator as task follower when new task is created </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Auto add task creator as task follower when new task is created [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Stop all other started timers when starting new timer </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Stop all other started timers when starting new timer [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Change task status to In Progress on timer started (valid only if task status is Not Started) </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Change task status to In Progress on timer started (valid only if task status is Not Started) [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Billable option is by default checked when new task is created? (only from admin area) </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Billable option is by default checked when new task is created? (only from admin area) [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Round off task timer</label>
                                <SelectDropdown
                                    options={roundOptions}
                                    defaultSelect={"round-up"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Applied to the Timesheets overview report and when invoicing a task/project.</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Default status when new task is created </label>
                                <SelectDropdown
                                    options={status}
                                    defaultSelect={"auto"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Default status when new task is created [Ex: Auto/Testing/Completed]</small>
                            </div>
                            <div className="mb-0">
                                <label className="form-label">Default Priority </label>
                                <SelectDropdown
                                    options={priority}
                                    defaultSelect={"low"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Default Priority [Ex: Low/Medium/High/Urgent]</small>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingsTasksForm