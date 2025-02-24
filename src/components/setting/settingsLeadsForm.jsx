import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import Footer from '@/components/shared/Footer'
import { leadsSourceOptions, leadsStatusOptions, taskPriorityOptions } from '@/utils/options'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { settingOptions } from './settingsEmailForm'


const SettingsLeadsForm = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const options= settingOptions
    const status = leadsStatusOptions
    const source = leadsSourceOptions
    const Priority = taskPriorityOptions
    return (
        <div className="content-area">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="mb-5">
                                <label className="form-label">Default status</label>
                                <SelectDropdown
                                    options={status}
                                    defaultSelect={"new"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Default status [Ex: Auto/Testing/Completed]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Default source</label>
                                <SelectDropdown
                                    options={source}
                                    defaultSelect={"facebook"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Default Priority [Ex: Facebook/Google/Others]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Default Priority </label>
                                <SelectDropdown
                                    options={Priority}
                                    defaultSelect={"low"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Default Priority [Ex: Low/Medium/High/Urgent]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Auto assign as admin to customer after convert</label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Auto assign as admin to customer after convert [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Allow non-admin staff members to import leads </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow non-admin staff members to import leads [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-0">
                                <label className="form-label">Do not allow leads to be edited after they are converted to customers (administrators not applied)</label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Do not allow leads to be edited after they are converted to customers (administrators not applied) [Ex: Yes/No]</small>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>
    )
}

export default SettingsLeadsForm