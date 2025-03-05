import React, { useState } from 'react'
import Footer from '@/components/shared/Footer'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import PerfectScrollbar from 'react-perfect-scrollbar'
import SelectDropdown from '@/components/shared/SelectDropdown'
import InputTopLabel from '@/components/shared/InputTopLabel'
import { settingOptions } from './settingsEmailForm'


const SettingsMiscellaneousForm = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const options= settingOptions
    return (
        <div className="content-area" data-scrollbar-target="#psScrollbarInit">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="mb-5">
                                <label className="form-label">Require client to be logged in to view contract </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Require client to be logged in to view contract [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Show setup menu item only when hover with mouse on main sidebar area </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Show setup menu item only when hover with mouse on main sidebar area [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Show help menu item on setup menu </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Show help menu item on setup menu [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Allow non-admin staff members to create Lead Status in Lead create/edit area? </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow non-admin staff members to create Lead Status in Lead create/edit area? [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Allow non-admin staff members to create Lead Source in Lead create/edit area? </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow non-admin staff members to create Lead Source in Lead create/edit area? [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Allow non-admin staff members to create Customer Group in Customer create/edit area? </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow non-admin staff members to create Customer Group in Customer create/edit area? [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Allow non-admin staff members to create Service in Ticket create/edit area? </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow non-admin staff members to create Service in Ticket create/edit area? [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Allow non-admin staff members to save predefined replies from ticket message </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow non-admin staff members to save predefined replies from ticket message [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Allow non-admin staff members to create Contract type in Contract create/edit area? </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow non-admin staff members to create Contract type in Contract create/edit area? [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Allow non-admin staff members to create Expense Category in Expense create/edit area? </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Allow non-admin staff members to create Expense Category in Expense create/edit area? [Ex: Yes/No]</small>
                            </div>
                            <hr className="my-5" />
                            <div className="mb-5">
                                <h4 className="fw-bold">Pusher.com</h4>
                                <div className="fs-12 text-muted">Pusher notification setup</div>
                            </div>
                            <InputTopLabel
                                label={"App ID"}
                                placeholder={"App ID"}
                                info={"App ID [Ex: THEMEOCEAN]"}
                            />
                            <InputTopLabel
                                label={"App key"}
                                placeholder={"App key"}
                                info={"App key [Ex: G-THEMEOCEAN-2024]"}
                            />
                            <InputTopLabel
                                label={"App Secret "}
                                placeholder={"App Secret "}
                                info={"App Secret  [Ex: 25DFSDDSF584DSF5245DFSF575]"}
                            />
                            <InputTopLabel
                                label={"Cluster"}
                                placeholder={"Cluster"}
                                info={"Cluster https://pusher.com/docs/clusters"}
                            />
                
                       
                            <div className="mb-5">
                                <label className="form-label">Enable Real Time Notifications </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Enable Real Time Notifications [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-0">
                                <label className="form-label"> Enable Desktop Notifications </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Enable Desktop Notifications [Ex: Yes/No]</small>
                            </div>
                            <hr className="my-5" />
                            <div className="mb-5">
                                <h4 className="fw-bold">E-Sign</h4>
                                <div className="fs-12 text-muted">E-Sign setup</div>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Require digital signature and identity confirmation on accept </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Require digital signature and identity confirmation on accept [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-0">
                                <label className="form-label">Require digital signature and identity confirmation on accept </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Require digital signature and identity confirmation on accept [Ex: Yes/No]</small>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingsMiscellaneousForm